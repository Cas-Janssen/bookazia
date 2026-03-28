package com.bookazia.backend.dao;

import com.bookazia.backend.dto.GetCategories;
import com.bookazia.backend.models.Category;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    List<Category> findAll(Sort sort);
    boolean existsByNameEnOrNameNl(String nameEn, String nameNl);
    List<GetCategories> findAllBy();
    Optional<Category> findByNameEnEqualsIgnoreCase(String name);
}
