package com.bookazia.backend.controllers;

import com.bookazia.backend.config.JWTUtil;
import com.bookazia.backend.dao.CustomUserDAO;
import com.bookazia.backend.dao.UserRepository;
import com.bookazia.backend.dto.RegisterDTO;
import com.bookazia.backend.dto.LoginDTO;
import com.bookazia.backend.dto.LoginResponse;
import com.bookazia.backend.models.CustomUser;
import com.bookazia.backend.models.Role;
import com.bookazia.backend.services.CredentialValidator;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/auth")
public class AuthController {

    private final UserRepository userDAO;
    private final JWTUtil jwtUtil;
    private final AuthenticationManager authManager;
    private final PasswordEncoder passwordEncoder;
    private final CredentialValidator validator;
    private final CustomUserDAO customUserDAO;

    public AuthController(UserRepository userDAO, JWTUtil jwtUtil, AuthenticationManager authManager, PasswordEncoder passwordEncoder, CredentialValidator validator, CustomUserDAO customUserDAO) {
        this.userDAO = userDAO;
        this.jwtUtil = jwtUtil;
        this.authManager = authManager;
        this.passwordEncoder = passwordEncoder;
        this.validator = validator;
        this.customUserDAO = customUserDAO;
    }

    @GetMapping("/admin")
    public ResponseEntity<LoginResponse> isAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        CustomUser customUser = this.customUserDAO.findByEmail(authentication.getPrincipal().toString());
        if (customUser == null ||  customUser.getRole() != Role.ROLE_ADMIN) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        }
        else {
            String token = jwtUtil.generateToken(customUser.getEmail());
            return ResponseEntity.ok(new LoginResponse(customUser.getEmail(), token));
        }
    }

    @PostMapping("/register")
    public ResponseEntity<LoginResponse> register(@RequestBody RegisterDTO registerDTO) {

        if (registerDTO.email == null || registerDTO.password == null || registerDTO.firstName == null || registerDTO.lastName == null || registerDTO.email.isEmpty() || registerDTO.password.isEmpty() || registerDTO.firstName.isEmpty() || registerDTO.lastName.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Missing required fields");
        }

        validator.isValidPassword(registerDTO.password);
        validator.isValidEmail(registerDTO.email);

        Optional<CustomUser> customUserByEmail = userDAO.findByEmail(registerDTO.email);

        if (customUserByEmail.isPresent()) {
            if (customUserByEmail.get().getPassword() != null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "There was an error creating the user"
            );
        } else { CustomUser customUser = customUserByEmail.get();
                String encodedPassword = passwordEncoder.encode(registerDTO.password);
                customUser.setPassword(encodedPassword);
                customUser.setEmail(registerDTO.email);
                customUser.setFirstName(registerDTO.firstName);
                customUser.setMiddleName(registerDTO.middleName);
                customUser.setLastName(registerDTO.lastName);
                customUser.setRole(Role.ROLE_USER);
                userDAO.save(customUser);
                customUserDAO.createShoppingCart(customUser);
                customUserDAO.createSavedItemsCart(customUser);
                String token = jwtUtil.generateToken(customUser.getEmail());
                LoginResponse loginResponse = new LoginResponse(customUser.getEmail(), token);
                return ResponseEntity.ok(loginResponse);
            }
        }

        String encodedPassword = passwordEncoder.encode(registerDTO.password);

        CustomUser registerdCustomUser = new CustomUser(registerDTO.email, encodedPassword, registerDTO.firstName, registerDTO.middleName, registerDTO.lastName);
        registerdCustomUser.setRole(Role.ROLE_USER);
        userDAO.save(registerdCustomUser);
        customUserDAO.createShoppingCart(registerdCustomUser);
        customUserDAO.createSavedItemsCart(registerdCustomUser);
        
        String token = jwtUtil.generateToken(registerdCustomUser.getEmail());
        LoginResponse loginResponse = new LoginResponse(registerdCustomUser.getEmail(), token);
        return ResponseEntity.ok(loginResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginDTO body) {
        try {
            UsernamePasswordAuthenticationToken authInputToken =
                    new UsernamePasswordAuthenticationToken(body.email, body.password);
            authManager.authenticate(authInputToken);

            String token = jwtUtil.generateToken(body.email);

            CustomUser customUser = userDAO.findByEmail(body.email).orElseThrow(() -> new UsernameNotFoundException("Incorrect credentials"));
            LoginResponse loginResponse = new LoginResponse(customUser.getEmail(), token);

            return ResponseEntity.ok(loginResponse);

        } catch (AuthenticationException authExc) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "No valid credentials"
            );
        }
    }

}


