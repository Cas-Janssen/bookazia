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
import org.springframework.util.StringUtils;

import java.util.Calendar;
import java.util.Date;

@Component
public class JWTUtil {

    private static final int DEFAULT_TOKEN_EXPIRATION_HOURS = 1;

    private final CustomUserRepository customUserRepository;
    private final String secret;
    private final int tokenExpiration;

    public JWTUtil(
            CustomUserRepository customUserRepository,
            @Value("${jwt.secret}") String secret,
            @Value("${jwt.tokenExpiration:1}") String tokenExpirationValue
    ) {
        this.customUserRepository = customUserRepository;
        if (!StringUtils.hasText(secret)) {
            throw new IllegalStateException("JWT secret is missing. Set JWT_SECRET environment variable.");
        }
        this.secret = secret;
        this.tokenExpiration = parseTokenExpiration(tokenExpirationValue);
    }

    public String generateToken(String email) throws IllegalArgumentException, JWTCreationException {
       String role = "ROLE_USER";
        var userOptional = customUserRepository.findByEmail(email);
        if (userOptional.isPresent() && userOptional.get().getRole() != null) {
            role = String.valueOf(userOptional.get().getRole());
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

    private int parseTokenExpiration(String tokenExpirationValue) {
        try {
            int parsed = Integer.parseInt(tokenExpirationValue);
            return parsed > 0 ? parsed : DEFAULT_TOKEN_EXPIRATION_HOURS;
        } catch (NumberFormatException ignored) {
            return DEFAULT_TOKEN_EXPIRATION_HOURS;
        }
    }
}
