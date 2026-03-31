package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.CategoryDAO;
import com.bookazia.backend.dto.GetCategories;
import com.bookazia.backend.dto.CategoryRequestDTO;
import com.bookazia.backend.models.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/categories")
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
public class CategoryController {
    private final CategoryDAO categoryDAO;

    public CategoryController(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @GetMapping
    public ResponseEntity<List<Category>> getAllCategories(@RequestParam(name="orderBy", required = false, defaultValue = "id") String orderBy, @RequestParam(name="orderType", required = false, defaultValue = "ASC") String orderType) {
        List<Category> categories = categoryDAO.getAllCategories(orderBy, orderType);
         return ResponseEntity.ok(categories);
    }
    @GetMapping("/names")
    public ResponseEntity<List<GetCategories>> getAllCategoryNames() {
        List<GetCategories> categories = categoryDAO.getAllCategoryNames();
        return ResponseEntity.ok(categories);
    }
    @GetMapping("/{name}")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String name) {
        Category category = this.categoryDAO.getCategoryByName(name);
        return ResponseEntity.ok(category);
    }

    @PostMapping("/add")
    public ResponseEntity<Map<String, String>> createCategory(@RequestBody CategoryRequestDTO categoryRequestDTO) {
        this.categoryDAO.createCategory(categoryRequestDTO);
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "Successfully created category: " + categoryRequestDTO.nameEn);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, String>> updateCategory(@PathVariable long id, @RequestBody CategoryRequestDTO categoryRequestDTO) {
        this.categoryDAO.updateCategoryById(id, categoryRequestDTO);
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "Successfully updated category: " + categoryRequestDTO.nameEn);
        return ResponseEntity.ok(response);
    }

}
