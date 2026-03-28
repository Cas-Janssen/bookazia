package com.bookazia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.time.LocalDateTime;
import java.util.Set;

@Entity(name = "custom_user")
@EntityListeners(AuditingEntityListener.class)
public class CustomUser {
    @Id
    @GeneratedValue
    private Long id;
    private String phoneNumber;
    private String firstName;
    private String middleName;
    private String lastName;
    private String address;
    private String city;
    private String postalCode;
    @Enumerated(EnumType.STRING)
    private PaymentMethods preferredPaymentMethod;
    private Role role;

    @CreatedDate
    @Column(updatable = false, nullable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(unique = true)
    private String email;
    private String password;

    @OneToMany(mappedBy = "user")
    @JsonIgnoreProperties("user")
    private Set<Order> orders;

    @OneToOne
    @JoinColumn(name = "saved_items_cart_id")
    private SavedItemsCart savedItemsCart;

    @OneToOne
    @JoinColumn(name = "shopping_cart_id")
    private ShoppingCart shoppingCart;

    public CustomUser() {
    }
    public CustomUser(String email, String firstName, String middleName, String lastName, String address, String city, String postalCode, PaymentMethods preferredPaymentMethod) {
        this.email = email;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
        this.preferredPaymentMethod = preferredPaymentMethod;
    }
    public CustomUser(String email, String password, String firstName, String middleName, String lastName) {
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }

    public void setAll(CustomUser customUser) {
        this.firstName = customUser.getFirstName();
        this.middleName = customUser.getMiddleName();
        this.lastName = customUser.getLastName();
        this.address = customUser.getAddress();
        this.city = customUser.getCity();
        this.postalCode = customUser.getPostalCode();
        this.phoneNumber = customUser.getPhoneNumber();
        this.email = customUser.getEmail();
        this.preferredPaymentMethod = customUser.getPreferredPaymentMethod();
    }

    public long getId() {
        return id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(String postalCode) {
        this.postalCode = postalCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Order> getOrders() {
        return orders;
    }

    public void setOrders(Set<Order> orders) {
        this.orders = orders;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public void setPreferredPaymentMethod(PaymentMethods preferredPaymentMethod) {
        this.preferredPaymentMethod = preferredPaymentMethod;
    }

    public PaymentMethods getPreferredPaymentMethod() {
        return preferredPaymentMethod;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public SavedItemsCart getSavedItemsCart() {
        return savedItemsCart;
    }

    public void setSavedItemsCart(SavedItemsCart savedItemsCart) {
        this.savedItemsCart = savedItemsCart;
    }
}
