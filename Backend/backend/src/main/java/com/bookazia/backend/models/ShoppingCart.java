package com.bookazia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class ShoppingCart {
    @Id
    @GeneratedValue
    private long id;
    private double totalPrice;

    @OneToOne(mappedBy = "shoppingCart")
    private CustomUser customUser;

    @OneToMany(mappedBy = "shoppingCart")
    @JsonIgnoreProperties("shoppingCart")
    private Set<CartItem> cartItems;

    public ShoppingCart() {}

    public ShoppingCart(double totalPrice, CustomUser user, Set<CartItem> cartItems) {
        this.totalPrice = totalPrice;
        this.cartItems = cartItems;
    }

    public long getId() {
        return id;
    }

    public double getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(double totalPrice) {
        this.totalPrice = totalPrice;
    }

    public Set<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public void calculateTotalValue() {
        double totalValue = 0;
        for (CartItem cartItem : this.cartItems) {
            totalValue += cartItem.getProduct().getPrice().floatValue() * cartItem.getQuantity();
        }

        this.totalPrice = totalValue;
    }
}
