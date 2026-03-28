package com.bookazia.backend.dao;

import com.bookazia.backend.models.CartItem;
import com.bookazia.backend.models.CartItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemRepository extends JpaRepository<CartItem, CartItemId> {
}
