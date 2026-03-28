package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.CartItemDAO;
import com.bookazia.backend.dao.CustomUserDAO;
import com.bookazia.backend.dto.CartItemDTO;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.ShoppingCart;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/user/cart")
public class CartController {
    private final CartItemDAO cartItemDAO;
    private final CustomUserDAO customUserDAO;

    public CartController(CartItemDAO cartItemDAO, CustomUserDAO customUserDAO) {
        this.cartItemDAO = cartItemDAO;
        this.customUserDAO = customUserDAO;
    }
    private CustomUser getCustomUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = (String)authentication.getPrincipal();
        return this.customUserDAO.findByEmail(currentUser);
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Map<String, String>> removeAllItems() {
        CustomUser customUser = getCustomUser();
        this.cartItemDAO.removeAllItems(customUser);
        Map<String, String> response = new HashMap<>();
        response.put("message", "All products removed from cart");
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<Map<String, String>> removeItem(@PathVariable long id) {
        CustomUser customUser = getCustomUser();
        this.cartItemDAO.removeSingleItem(customUser, id);
        Map<String, String> response = new HashMap<>();
        response.put("message", "Product removed from cart");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/update")
    public ResponseEntity<CartItemDTO> addCartItem(@RequestBody CartItemDTO cartItemDTO) {
        CustomUser customUser = getCustomUser();
        this.cartItemDAO.addCartItem(customUser, cartItemDTO);
        return ResponseEntity.ok(cartItemDTO);
    }
    @GetMapping
    public ResponseEntity<ShoppingCart> getShoppingCart() {
        CustomUser customUser = getCustomUser();
        ShoppingCart shoppingCart = this.cartItemDAO.getShoppingCart(customUser);
        return ResponseEntity.ok(shoppingCart);
    }
}


