package com.bookazia.backend.dao;

import com.bookazia.backend.dto.OrderDTO;
import com.bookazia.backend.dto.OrderResponseDTO;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.Order;
import com.bookazia.backend.models.OrderProduct;
import com.bookazia.backend.models.Product;
import com.bookazia.backend.services.CredentialValidator;
import com.bookazia.backend.services.OrderValidator;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashSet;
import java.util.Set;

import static com.bookazia.backend.models.OrderStatus.PENDING;

@Component
public class OrderDAO {
    private final CredentialValidator credentialValidator;
    private final OrderValidator orderValidator;
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final OrderProductRepository orderProductRepository;
    private final CustomUserDAO customUserDAO;

    public OrderDAO(CredentialValidator credentialValidator, OrderValidator orderValidator, UserRepository userRepository, OrderRepository orderRepository, ProductRepository productRepository, OrderProductRepository orderProductRepository, CustomUserDAO customUserDAO) {
        this.credentialValidator = credentialValidator;
        this.orderValidator = orderValidator;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
        this.orderProductRepository = orderProductRepository;
        this.customUserDAO = customUserDAO;

    }

    public Order addOrder(OrderDTO orderDTO) {
        orderValidator.isValidOrder(orderDTO);
        credentialValidator.isValidEmail(orderDTO.email);
        CustomUser customUser = new CustomUser(orderDTO.email, orderDTO.firstName, orderDTO.middleName, orderDTO.lastName, orderDTO.address, orderDTO.city, orderDTO.postalCode, orderDTO.usedPaymentMethod);
        Order order;
        if (userRepository.findByEmail(orderDTO.email).isPresent()) {
            CustomUser customUserFound = userRepository.findByEmail(orderDTO.email).get();
            customUserFound.setAll(customUser);
            this.userRepository.saveAndFlush(customUserFound);
            order = new Order(customUserFound ,orderDTO.totalPrice, PENDING, orderDTO.usedPaymentMethod);
            this.orderRepository.save(order);
        }
        else {
            this.userRepository.saveAndFlush(customUser);
            order = new Order(customUser ,orderDTO.totalPrice, PENDING, orderDTO.usedPaymentMethod);
            this.orderRepository.save(order);
        }
        Set<OrderProduct> orderProducts = new HashSet<>();
        orderDTO.cartItems.forEach(cartItem -> {
            if (productRepository.findProductById(cartItem.productId).isPresent()) {
                Product product = productRepository.findProductById(cartItem.productId).get();
                orderProducts.add(new OrderProduct(cartItem.quantity, product.getPrice().doubleValue(), product, order));
                int newStock = product.getStock() - cartItem.quantity;
                if (newStock < 0) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough items in stock!");
                }
                product.setStock(newStock);
                this.productRepository.save(product);
            }});
        this.orderProductRepository.saveAllAndFlush(orderProducts);
        return order;
    }

    public Set<OrderResponseDTO> getOrders() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = (String)authentication.getPrincipal();
        CustomUser customUser = this.customUserDAO.findByEmail(currentUser);
        if (customUser == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }
        Set<Order> orders = customUser.getOrders();
        Set<OrderResponseDTO> orderResponseDTOs = new HashSet<>();
        orders.forEach(order -> {
            OrderResponseDTO orderResponseDTO = new OrderResponseDTO();
            orderResponseDTO.setId(order.getId());
            orderResponseDTO.setTotalPrice(order.getTotalPrice());
            orderResponseDTO.setOrderStatus(order.getOrderStatus());
            orderResponseDTO.setUsedPaymentMethod(order.getUsedPaymentMethod());
            orderResponseDTO.setOrderProducts(order.getOrderProducts());
            orderResponseDTO.setUpdatedAt(order.getUpdatedAt());
            orderResponseDTO.setCreatedAt(order.getCreatedAt());
            orderResponseDTOs.add(orderResponseDTO);
        });
        return orderResponseDTOs;
    }
}
