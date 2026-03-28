package com.bookazia.backend.models;

import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class SavedCartItemId implements Serializable {

    private Long savedCartId;
    private Long productId;

    public SavedCartItemId() {}

    public SavedCartItemId(Long cartId, Long productId) {
        this.savedCartId = cartId;
        this.productId = productId;
    }

    public Long getCartId() {
        return savedCartId;
    }

    public void setCartId(Long cartId) {
        this.savedCartId = cartId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof SavedCartItemId)) return false;
        SavedCartItemId that = (SavedCartItemId) o;
        return Objects.equals(savedCartId, that.savedCartId) &&
                Objects.equals(productId, that.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(savedCartId, productId);
    }
}

