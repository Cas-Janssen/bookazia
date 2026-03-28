package com.bookazia.backend.models;

public enum OrderStatus {
    PENDING,
    PROCESSING,
    OUT_FOR_DELIVERY,
    SHIPPED,
    DELIVERED,
    CANCELLED,
    RETURNED,
    REFUNDED,
    FAILED
}
