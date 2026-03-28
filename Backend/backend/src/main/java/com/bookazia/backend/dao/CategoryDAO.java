package com.bookazia.backend.dao;

import com.bookazia.backend.dto.GetCategories;
import com.bookazia.backend.dto.CategoryRequestDTO;
import com.bookazia.backend.models.Category;
import com.bookazia.backend.models.Product;
import com.bookazia.backend.services.UserService;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class CategoryDAO {
    private final CategoryRepository categoryRepository;
    private final UserService userService;


    public CategoryDAO(CategoryRepository categoryRepository, UserService userService) {
        this.categoryRepository = categoryRepository;
        this.userService = userService;
    }

    public List<GetCategories> getAllCategoryNames() {
        return categoryRepository.findAllBy();
    }

    public List<Category> getAllCategories(String orderBy, String orderType) {
        List<Category> categories = null;
        if (orderType.equalsIgnoreCase("ASC")) {
            categories = categoryRepository.findAll(Sort.by(Sort.Direction.ASC, orderBy));
        }
        else {
            this.categoryRepository.findAll(Sort.by(Sort.Direction.DESC, orderBy));
        }
        return categories;
    }

    public Category getCategoryByName(String name) {
        Optional<Category> optionalCategory = this.categoryRepository.findByNameEnEqualsIgnoreCase(name);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            if (category.getProducts() != null) {
                Set<Product> enabledProducts = category.getProducts().stream()
                        .filter(Product::isEnabled)
                        .collect(Collectors.toSet());
                category.setProducts(enabledProducts);
            }

            return category;
        }
        else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found");
        }
    }

    public void createCategory(CategoryRequestDTO categoryRequestDTO) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to add a Category"
            );
        }
        if (categoryRequestDTO.nameEn.isEmpty() || categoryRequestDTO.nameNl.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Category name cannot be empty");
        }
        else if(categoryRepository.existsByNameEnOrNameNl(categoryRequestDTO.nameEn, categoryRequestDTO.nameNl)) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Category name already exists");
        }
        else if (categoryRequestDTO.description.isEmpty()) {
            Category category = new Category(categoryRequestDTO.nameEn, categoryRequestDTO.nameNl);
            this.categoryRepository.save(category);
        }
        else {
        Category category = new Category(categoryRequestDTO.nameEn, categoryRequestDTO.nameNl, categoryRequestDTO.description);
        this.categoryRepository.save(category);
        }
    }


    public void updateCategoryById(long id, CategoryRequestDTO categoryRequestDTO) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to edit a Category"
            );
        }
        Optional<Category> optionalCategory = this.categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category updatedCategory = optionalCategory.get();
            if (updatedCategory.getNameEn().equals(categoryRequestDTO.nameEn)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Category already has this name");
            }
            else if(this.categoryRepository.existsByNameEnOrNameNl(categoryRequestDTO.nameEn, categoryRequestDTO.nameNl)) {
                throw new ResponseStatusException(
                        HttpStatus.CONFLICT,
                        "Category name already exists");
            }
            else {
                updatedCategory.setNameEn(categoryRequestDTO.nameEn);
                updatedCategory.setNameNl(categoryRequestDTO.nameNl);
                if (categoryRequestDTO.description.isEmpty()) {
                    this.categoryRepository.save(updatedCategory);
                }
                else {
                updatedCategory.setDescription(categoryRequestDTO.description);
                this.categoryRepository.save(updatedCategory);
                }
            }
        }
        else {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Category not found"
            );
        }
    }
}
