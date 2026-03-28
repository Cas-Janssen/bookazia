package com.bookazia.backend.services;

import com.bookazia.backend.dao.ProductRepository;
import com.bookazia.backend.dto.ProductDTO;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductValidator {
    private ProductRepository productRepository;

    public boolean validateCreateProduct(ProductDTO product) {
        if (product.title == null || product.title.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Product title is required"
            );
        }

        else if (productRepository.findProductByTitle(product.title).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Product title already exists"
            );
        }
        return true;
    }
}
