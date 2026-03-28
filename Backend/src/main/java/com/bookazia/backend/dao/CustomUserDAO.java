package com.bookazia.backend.dao;

import com.bookazia.backend.config.JWTUtil;
import com.bookazia.backend.config.SecurityConfig;
import com.bookazia.backend.dto.CustomUserDTO;
import com.bookazia.backend.dto.LoginResponse;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.SavedItemsCart;
import com.bookazia.backend.models.ShoppingCart;
import com.bookazia.backend.services.CredentialValidator;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@Component
public class CustomUserDAO {
    private final CustomUserRepository customUserRepository;
    private final ShoppingCartRepository shoppingCartRepository;
    private final CredentialValidator credentialValidator;
    private final SecurityConfig securityConfig;
    private final JWTUtil jwtUtil;
    private final SavedItemsCartRepository savedItemsCartRepository;


    public CustomUserDAO(CustomUserRepository customUserRepository, ShoppingCartRepository shoppingCartRepository, CredentialValidator credentialValidator, SecurityConfig securityConfig, JWTUtil jwtUtil, SavedItemsCartRepository savedItemsCartRepository) {
        this.customUserRepository = customUserRepository;
        this.shoppingCartRepository = shoppingCartRepository;
        this.credentialValidator = credentialValidator;
        this.securityConfig = securityConfig;
        this.jwtUtil = jwtUtil;
        this.savedItemsCartRepository = savedItemsCartRepository;
    }

    public CustomUser findByEmail(String email) {
        Optional<CustomUser> optionalCustomUser = this.customUserRepository.findByEmail(email);
        if (optionalCustomUser.isPresent()) {
            return optionalCustomUser.get();
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials");
        }
    }

    public void createShoppingCart(CustomUser customUser) {
        if (customUser.getShoppingCart() == null) {
            ShoppingCart createdCart = new ShoppingCart();
            this.shoppingCartRepository.save(createdCart);
            customUser.setShoppingCart(createdCart);
            this.customUserRepository.save(customUser);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already has a shopping cart");
        }
    }

    public void createSavedItemsCart(CustomUser customUser) {
        if (customUser.getSavedItemsCart() == null) {
            SavedItemsCart createdCart = new SavedItemsCart();
            this.savedItemsCartRepository.save(createdCart);
            customUser.setSavedItemsCart(createdCart);
            this.customUserRepository.save(customUser);
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User already has a saved items cart");
        }
    }

    public LoginResponse updateUserProfile(CustomUserDTO customUserDTO) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = (String)authentication.getPrincipal();
        CustomUser customUser = this.findByEmail(currentUser);
        if (customUserDTO.firstName == null || customUserDTO.firstName.isEmpty() || customUserDTO.lastName == null || customUserDTO.lastName.isEmpty() || customUserDTO.email == null || customUserDTO.email.isEmpty() || customUserDTO.password == null || customUserDTO.password.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required credentials");
        }

        if (!securityConfig.passwordEncoder().matches(customUserDTO.password, customUser.getPassword())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials provided!");
        };

        this.credentialValidator.isValidEmail(customUserDTO.email);
        if (!customUserDTO.email.equalsIgnoreCase(customUser.getEmail()) && this.customUserRepository.findByEmail(customUserDTO.email).isPresent()) {;
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid credentials provided!");
        }

        customUser.setFirstName(customUserDTO.firstName);
        customUser.setMiddleName(customUserDTO.middleName);
        customUser.setLastName(customUserDTO.lastName);
        customUser.setAddress(customUserDTO.address);
        customUser.setCity(customUserDTO.city);
        customUser.setPostalCode(customUserDTO.postalCode);
        customUser.setPhoneNumber(customUserDTO.phoneNumber);
        customUser.setEmail(customUserDTO.email);
        customUserRepository.save(customUser);

        return new LoginResponse(customUser.getEmail(), this.jwtUtil.generateToken(customUser.getEmail()));
    }
}
