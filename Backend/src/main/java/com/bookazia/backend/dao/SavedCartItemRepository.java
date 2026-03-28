package com.bookazia.backend.dao;

import com.bookazia.backend.models.SavedCartItem;
import com.bookazia.backend.models.SavedCartItemId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SavedCartItemRepository extends JpaRepository<SavedCartItem, SavedCartItemId> {
}
