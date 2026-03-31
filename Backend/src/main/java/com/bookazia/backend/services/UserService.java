package com.bookazia.backend.services;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.bookazia.backend.dao.CustomUserRepository;
import com.bookazia.backend.dao.UserRepository;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {
    private final CustomUserRepository customUserRepository;
    public UserService(CustomUserRepository customUserRepository) {
        this.customUserRepository = customUserRepository;
    }

    public boolean checkIfUserIsAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUser = (String) authentication.getPrincipal();
        Optional<CustomUser> customUser = this.customUserRepository.findByEmail(currentUser);
        if (customUser.isPresent()) {
            CustomUser customUserFound = customUser.get();
            return customUserFound.getRole().equals(Role.ROLE_ADMIN);
        } else {
            return false;
        }


    }

    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String identifier) {
        Optional<CustomUser> optionalUser = userRepository.findByEmail(identifier);

        if (optionalUser.isPresent()) {
            CustomUser user = optionalUser.get();
            return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER")));
        }
        else {
            throw new JWTVerificationException("Invalid credentials");
        }

}
}
