package com.bookazia.backend.models;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

import java.util.Set;

@Entity
public class SavedItemsCart {
    @Id
    @GeneratedValue
    private long id;
    private double totalPrice;

    @OneToOne(mappedBy = "savedItemsCart")
    private CustomUser customUser;

    @OneToMany(mappedBy = "savedItemsCart")
    @JsonIgnoreProperties("savedCart")
    private Set<SavedCartItem> savedCartItems;

    public SavedItemsCart() {}

    public SavedItemsCart(double totalPrice, CustomUser user, Set<SavedCartItem> savedCartItems) {
        this.totalPrice = totalPrice;
        this.savedCartItems = savedCartItems;
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

    public Set<SavedCartItem> getSavedCartItems() {
        return savedCartItems;
    }

    public void setSavedCartItems(Set<SavedCartItem> cartItems) {
        this.savedCartItems = cartItems;
    }

    public void calculateTotalValue() {
        double totalValue = 0;
        for (SavedCartItem cartItem : this.savedCartItems) {
            totalValue += cartItem.getProduct().getPrice().floatValue();
        }

        this.totalPrice = totalValue;
    }
}
