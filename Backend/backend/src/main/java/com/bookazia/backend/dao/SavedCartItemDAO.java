package com.bookazia.backend.dao;

import com.bookazia.backend.models.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;
import java.util.Set;

@Component
public class SavedCartItemDAO {
    private final SavedCartItemRepository savedCartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    public SavedCartItemDAO(SavedCartItemRepository savedCartItemRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.savedCartItemRepository = savedCartItemRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    private CustomUser getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        Optional<CustomUser> customUser = this.userRepository.findByEmail(auth.getPrincipal().toString());
        if (customUser.isPresent()) {
            return customUser.get();
        } else {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "User not found"
            );
        }
    }

    public SavedItemsCart getSavedItems() {
        CustomUser customUser = getUser();
        SavedItemsCart savedItemsCart = customUser.getSavedItemsCart();
        if (savedItemsCart == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saved cart not found for user");
        }
        else {
            savedItemsCart.calculateTotalValue();
        }
        return savedItemsCart;
    }

    public void addSavedItem(Long productId) {
        CustomUser customUser = getUser();
        SavedItemsCart savedItemsCart = customUser.getSavedItemsCart();
        if (savedItemsCart == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saved item cart does not exist! Maybe you need to register?");}
        else {
            Set<SavedCartItem> cartItems = savedItemsCart.getSavedCartItems();
            Optional<Product> product = this.productRepository.findProductById(productId);
            if (product.isPresent()) {
                if (cartItems.isEmpty()) {
                    SavedCartItemId id = new SavedCartItemId(savedItemsCart.getId(), product.get().getId());
                    SavedCartItem cartItem = new SavedCartItem(savedItemsCart, product.get());
                    cartItem.setId(id);
                    savedCartItemRepository.save(cartItem);
                }
                else {
                    for (SavedCartItem cartitem: cartItems) {
                        if (cartitem.getProduct().getId() == productId) {
                            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product already in saved cart!");
                        }
                        else {
                            SavedCartItem cartItem = new SavedCartItem(savedItemsCart, product.get());
                            SavedCartItemId id = new SavedCartItemId(savedItemsCart.getId(), product.get().getId());
                            cartItem.setId(id);
                            savedCartItemRepository.save(cartItem);
                        }
                    }
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found!");
            }
        }
    }

    public void clearSavedItems() {
        CustomUser customUser = getUser();
        SavedItemsCart savedItemsCart = customUser.getSavedItemsCart();
        if (savedItemsCart != null) {
            Set<SavedCartItem> savedCartItems = savedItemsCart.getSavedCartItems();
            if (!savedCartItems.isEmpty()) {
                savedCartItemRepository.deleteAll(savedCartItems);
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Shopping cart not found for user");
        }
    }


    public void deleteSavedItem(Long id) {
        SavedItemsCart savedItemsCart = getUser().getSavedItemsCart();
        if (savedItemsCart != null) {
            Set<SavedCartItem> cartItems = savedItemsCart.getSavedCartItems();
            if (!cartItems.isEmpty()) {
                boolean itemFound = false;
                for (SavedCartItem cartItem : cartItems) {
                    if (cartItem.getProduct().getId() == id) {
                        savedCartItemRepository.delete(cartItem);
                        itemFound = true;
                        break;
                    }
                }
                if (!itemFound) {
                    throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found in saved cart!");
                }
            }
            else {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "User has no products in saved cart!");
            }
        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Saved cart not found for user");
        }
    }
}

