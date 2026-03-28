package com.bookazia.backend.dao;

import com.bookazia.backend.models.SavedItemsCart;
import org.springframework.data.jpa.repository.JpaRepository;


public interface SavedItemsCartRepository extends JpaRepository<SavedItemsCart, Long> {
}
