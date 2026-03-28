package com.bookazia.backend.controllers;

import com.bookazia.backend.config.JWTUtil;
import com.bookazia.backend.dao.CustomUserDAO;
import com.bookazia.backend.dto.CustomUserDTO;
import com.bookazia.backend.dto.LoginResponse;
import com.bookazia.backend.models.CustomUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/user")
public class CustomUserController {
    private final CustomUserDAO customUserDAO;

    public CustomUserController(CustomUserDAO customUserDAO, JWTUtil jwtUtil) {
        this.customUserDAO = customUserDAO;
    }

    private String maskEmail(String email) {
        int atIndex = email.indexOf("@");
        if (atIndex <= 3) {
            return email;
        }
        StringBuilder maskedEmail = new StringBuilder(email.substring(0, 2));
        for (int i = 3; i <= atIndex; i++) {
            maskedEmail.append("*");
        }
        maskedEmail.append(email.substring(atIndex));
        return maskedEmail.toString();
    }
    @GetMapping("/me")
    public ResponseEntity<CustomUser> getUserInfo() {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            CustomUser customUser = this.customUserDAO.findByEmail(authentication.getPrincipal().toString());
        customUser.setPassword("hidden");
        customUser.setEmail(maskEmail(customUser.getEmail()));
        customUser.setOrders(null);
        customUser.setShoppingCart(null);
        return ResponseEntity.ok(customUser);
    }
    @PutMapping("/update")
    public ResponseEntity<LoginResponse> updateUserProfile(@RequestBody CustomUserDTO customUserDTO) {
        LoginResponse loginResponse = this.customUserDAO.updateUserProfile(customUserDTO);
        return ResponseEntity.ok(loginResponse);
    }

}


