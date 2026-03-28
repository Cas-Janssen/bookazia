package com.bookazia.backend.dao;

import com.bookazia.backend.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    Optional<Product> findProductById(Long id);
    Optional<Product> findProductByTitle(String title);
    List<Product> findByTitleContainingIgnoreCase(String query);
    Optional<Product> findByIsbn(String isbn);
    List<Product> findByIsbnContaining(String query);
    List<Product> findByAuthorsFirstNameContainingIgnoreCaseOrAuthorsLastNameContainingIgnoreCase(String firstName, String lastName);
    List<Product> findByCategoriesNameEnContainingIgnoreCaseOrCategoriesNameNlContainingIgnoreCase(String queryEn, String queryNl);
}
