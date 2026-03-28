package com.bookazia.backend.models;

import jakarta.persistence.*;

@Entity
public class CartItem {
    @EmbeddedId
    private CartItemId id;
    private int quantity;

    @MapsId("cartId")
    @ManyToOne
    @JoinColumn(name = "cart_id")
    private ShoppingCart shoppingCart;

    @MapsId("productId")
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    public CartItem() {}

    public CartItem(int quantity, ShoppingCart shoppingCart, Product product) {
        this.quantity = quantity;
        this.shoppingCart = shoppingCart;
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setId(CartItemId id) {
        this.id = id;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public ShoppingCart getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }
}
