package com.bookazia.backend.dto;

import com.bookazia.backend.models.PaymentMethods;

import java.math.BigDecimal;
import java.util.Set;

public class OrderDTO {
    public BigDecimal totalPrice;
    public PaymentMethods usedPaymentMethod;
    public String email;
    public String firstName;
    public String middleName;
    public String lastName;
    public String address;
    public String city;
    public String postalCode;
    public Set<CartItemDTO> cartItems;



}
