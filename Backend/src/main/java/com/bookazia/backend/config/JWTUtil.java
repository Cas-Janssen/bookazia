package com.bookazia.backend.config;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import com.bookazia.backend.dao.CustomUserRepository;
import com.bookazia.backend.models.Role;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Component
public class JWTUtil {

    private final CustomUserRepository customUserRepository;
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.tokenExpiration}")
    private int tokenExpiration;

    public JWTUtil(CustomUserRepository customUserRepository) {
        this.customUserRepository = customUserRepository;
    }

    public String generateToken(String email) throws IllegalArgumentException, JWTCreationException {
       String role = "ROLE_USER";
        if (customUserRepository.findByEmail(email).isPresent() && customUserRepository.findByEmail(email).get().getRole() != null) {
            role = String.valueOf(customUserRepository.findByEmail(email).get().getRole());
        }
        return JWT.create()
                .withSubject("User Details")
                .withClaim("email", email)
                .withClaim("role", role)
                .withIssuedAt(new Date())
                .withExpiresAt(this.createTokenExpirationDate())
                .withIssuer("Bookazia")
                .sign(Algorithm.HMAC256(secret));
    }

    public String validateTokenAndRetrieveSubject(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User Details")
                .withIssuer("Bookazia")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getClaim("email").asString();
    }

    public Role validateTokenAndRetrieveRole(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC256(secret))
                .withSubject("User Details")
                .withIssuer("Bookazia")
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return Role.valueOf(jwt.getClaim("role").asString());
    }

    private Date createTokenExpirationDate(){
        Calendar appendableDate = Calendar.getInstance();
        appendableDate.setTime(new Date());
        appendableDate.add(Calendar.HOUR, tokenExpiration);
        return appendableDate.getTime();
    }
}
