package com.bookazia.backend.services;

import com.bookazia.backend.dto.CartItemDTO;
import com.bookazia.backend.dto.OrderDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class OrderValidator {
    public void isValidOrder(OrderDTO order) {
        if (order.totalPrice == null || order.usedPaymentMethod == null || order.address == null || order.address.isEmpty() || order.city == null || order.city.isEmpty() || order.email == null || order.email.isEmpty() || order.cartItems == null || order.cartItems.isEmpty() ||  order.postalCode == null || order.postalCode.isEmpty() || order.firstName == null || order.firstName.isEmpty() || order.lastName == null || order.lastName.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "missing required fields");
        }
        if (order.totalPrice.floatValue() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Pricing error");
        }

        if (!order.postalCode.matches( "(?i)^[1-9][0-9]{3}\\s?(?!sa|sd|ss)[a-z]{2}$")) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid postal code");
        }
        for (CartItemDTO item : order.cartItems) {
            if (item.quantity <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid quantity");
            }
        }
  }

}
