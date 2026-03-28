package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.OrderDAO;
import com.bookazia.backend.dto.OrderDTO;
import com.bookazia.backend.dto.OrderResponseDTO;
import com.bookazia.backend.models.Order;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/orders")
public class OrderController {
    private final OrderDAO orderDAO;

    public OrderController(OrderDAO orderDAO ) {
        this.orderDAO = orderDAO;
    }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestBody OrderDTO orderDTO) {
        Order order = this.orderDAO.addOrder(orderDTO);
        return ResponseEntity.ok(order);
    };
    @GetMapping
    public ResponseEntity<Set<OrderResponseDTO>> getOrders() {
        Set<OrderResponseDTO> orders = this.orderDAO.getOrders();
        return ResponseEntity.ok(orders);
    };
}
