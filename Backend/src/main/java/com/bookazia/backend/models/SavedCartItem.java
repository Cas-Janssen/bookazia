package com.bookazia.backend.models;

import jakarta.persistence.*;

@Entity
public class SavedCartItem {
    @EmbeddedId
    private SavedCartItemId id;

    @MapsId("savedCartId")
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private SavedItemsCart savedItemsCart;

    @MapsId("productId")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public SavedCartItem() {}

    public SavedCartItem(SavedItemsCart savedItemsCart, Product product) {
        this.savedItemsCart = savedItemsCart;
        this.product = product;
    }

    public void setId(SavedCartItemId id) {
        this.id = id;
    }

    public SavedItemsCart getSavedCart() {
        return savedItemsCart;
    }

    public void setSavedItemsCart(SavedItemsCart savedItemsCart) {
        this.savedItemsCart = savedItemsCart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
