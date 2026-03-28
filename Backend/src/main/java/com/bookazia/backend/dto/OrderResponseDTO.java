package com.bookazia.backend.dto;

import com.bookazia.backend.models.OrderProduct;
import com.bookazia.backend.models.OrderStatus;
import com.bookazia.backend.models.PaymentMethods;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

public class OrderResponseDTO {
    public Long id;
    public PaymentMethods usedPaymentMethod;
    public BigDecimal totalPrice;
    public Set<OrderProduct> orderProducts;
    public LocalDateTime createdAt;
    public LocalDateTime updatedAt;
    public OrderStatus orderStatus;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public PaymentMethods getUsedPaymentMethod() {
        return usedPaymentMethod;
    }

    public void setUsedPaymentMethod(PaymentMethods usedPaymentMethod) {
        this.usedPaymentMethod = usedPaymentMethod;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Set<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(Set<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }
}

