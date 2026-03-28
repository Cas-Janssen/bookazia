package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.ProductDAO;
import com.bookazia.backend.dto.ProductDTO;
import com.bookazia.backend.models.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/products")
public class ProductController {
    private final ProductDAO productDAO;

    public ProductController(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(this.productDAO.getAllProducts());
    }

    @GetMapping("{id}")
    public ResponseEntity<Product> getSpecificProduct(@PathVariable Long id) {
        return ResponseEntity.ok(this.productDAO.getSpecificProduct(id));
    }

    @PostMapping("add")
    public ResponseEntity<Product> addProduct(@RequestBody ProductDTO productDTO) {
        Product product =  this.productDAO.addProduct(productDTO);
        return ResponseEntity.ok(product);
    }
    @PutMapping("{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody ProductDTO productDTO) {
        Product product = this.productDAO.updateProduct(id, productDTO);
        return ResponseEntity.ok(product);
    }
    @DeleteMapping("{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable Long id) {
        Product product = this.productDAO.deleteProduct(id);
        return ResponseEntity.ok(product);
    }
    @PatchMapping("/activate/{id}")
    public ResponseEntity<Product> reactivateProduct(@PathVariable long id) {
        Product product = this.productDAO.updateProductStatus(id);
        return ResponseEntity.ok(product);
    }
    @GetMapping("/search/{query}")
    public ResponseEntity<List<Product>> searchProducts(@PathVariable String query) {
        return ResponseEntity.ok(this.productDAO.searchProducts(query));
    }

}
