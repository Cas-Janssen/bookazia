package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.SavedCartItemDAO;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.SavedItemsCart;
import com.bookazia.backend.models.ShoppingCart;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/user/saved")
public class SavedItemsCartController {
    private final SavedCartItemDAO savedCartItemDAO;

    public SavedItemsCartController(SavedCartItemDAO savedCartItemDAO) {
        this.savedCartItemDAO = savedCartItemDAO;
    }

    @GetMapping
    public ResponseEntity<SavedItemsCart> getSavedItems() {
        SavedItemsCart savedItemsCart = this.savedCartItemDAO.getSavedItems();
        return ResponseEntity.ok(savedItemsCart);
    }


    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, String>> deleteSavedItem(@PathVariable Long id) {
        savedCartItemDAO.deleteSavedItem(id);
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "Product with id " + id + " deleted from saved items.");
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> clearSavedItems() {
        savedCartItemDAO.clearSavedItems();
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "All items removed from cart");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<Map <String, String>> addSavedItem(@PathVariable Long productId) {
        savedCartItemDAO.addSavedItem(productId);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product with id " + productId + " added to saved items.");
        return ResponseEntity.ok(response);
    }
}
