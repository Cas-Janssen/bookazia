package com.bookazia.backend.dao;

import com.bookazia.backend.dto.CartItemDTO;
import com.bookazia.backend.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

@Component
public class CartItemDAO {
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartItemDAO(CartItemRepository cartItemRepository, ProductRepository productRepository) {
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public void addCartItem(CustomUser customUser, CartItemDTO cartItemDTO) {
        ShoppingCart shoppingCart = customUser.getShoppingCart();
        if (shoppingCart == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shopping cart does not exist! Maybe you need to register?");}
        else {
        Set<CartItem> cartItems = shoppingCart.getCartItems();
        Optional<Product> product = this.productRepository.findProductById(cartItemDTO.productId);
        if (product.isPresent()) {
            if (cartItemDTO.quantity > 10 || cartItemDTO.quantity <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Quantity is invalid, must be between 1 and 10");
            }
            if (cartItemDTO.quantity > product.get().getStock()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Not enough items in stock!");
            }
            if (cartItems.isEmpty()) {
                CartItemId id = new CartItemId(shoppingCart.getId(), product.get().getId());
                CartItem cartItem = new CartItem(cartItemDTO.quantity, shoppingCart, product.get());
                cartItem.setId(id);
                cartItemRepository.save(cartItem);
            }
            else {
                for (CartItem cartitem: cartItems) {
                    if (cartitem.getProduct().getId() == cartItemDTO.productId) {
                        cartitem.setQuantity(cartItemDTO.quantity);
                        cartItemRepository.save(cartitem);
                    }
                    else {
                        CartItem cartItem = new CartItem(cartItemDTO.quantity, shoppingCart, product.get());
                        CartItemId id = new CartItemId(shoppingCart.getId(), product.get().getId());
                        cartItem.setId(id);
                        cartItemRepository.save(cartItem);
                    }
                }
            }
        }
        else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found!");
            }
        }
    }

    public void removeAllItems(CustomUser customUser) {
        ShoppingCart shoppingCart = customUser.getShoppingCart();
        if (shoppingCart != null) {
            Set<CartItem> cartItems = shoppingCart.getCartItems();
            if (!cartItems.isEmpty()) {
                cartItemRepository.deleteAll(cartItems);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shopping cart not found for user");
        }
    }

    public void removeSingleItem(CustomUser customUser, long id) {
        ShoppingCart shoppingCart = customUser.getShoppingCart();
        if (shoppingCart != null) {
            Set<CartItem> cartItems = shoppingCart.getCartItems();
            if (!cartItems.isEmpty()) {
                boolean itemFound = false;
                for (CartItem cartItem : cartItems) {
                    if (cartItem.getProduct().getId() == id) {
                        cartItemRepository.delete(cartItem);
                        itemFound = true;
                        break;
                    }
                }
                if (!itemFound) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found in cart!");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User has no products in cart!");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shopping cart not found for user");
        }
    }

    public ShoppingCart getShoppingCart(CustomUser customUser) {
        ShoppingCart shoppingCart = customUser.getShoppingCart();
        if (shoppingCart == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shopping cart not found for user");
        }
        else {
        Set<CartItem> cartItems = shoppingCart.getCartItems();
        for (CartItem cartItem: cartItems) {
            if (!cartItem.getProduct().isEnabled() || cartItem.getProduct().getStock() <= 0) {
                cartItemRepository.delete(cartItem);
            }
        }
            shoppingCart.calculateTotalValue();
            return shoppingCart;
        }

    }
}

