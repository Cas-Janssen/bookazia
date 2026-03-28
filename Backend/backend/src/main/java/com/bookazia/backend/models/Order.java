package com.bookazia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@EntityListeners(AuditingEntityListener.class)
@Table(name = "custom_order")
public class Order {
    @Id
    @GeneratedValue
    private long id;
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;
    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;
    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @Enumerated(EnumType.STRING)
    private PaymentMethods usedPaymentMethod;

    private BigDecimal totalPrice;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties("orders")
    private CustomUser user;

    @OneToMany(mappedBy = "order")
    private Set<OrderProduct> orderProducts;

    public Order() {}

    public Order(CustomUser user, BigDecimal totalPrice, OrderStatus orderStatus, PaymentMethods usedPaymentMethod) {
        this.user = user;
        this.totalPrice = totalPrice;
        this.orderStatus = orderStatus;
        this.usedPaymentMethod = usedPaymentMethod;
    }

    public long getId() {
        return id;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public CustomUser getUser() {
        return user;
    }

    public void setUser(CustomUser user) {
        this.user = user;
    }

    public Set<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(Set<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public PaymentMethods getUsedPaymentMethod() {
        return usedPaymentMethod;
    }

    public void setUsedPaymentMethod(PaymentMethods usedPaymentMethod) {
        this.usedPaymentMethod = usedPaymentMethod;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
}
