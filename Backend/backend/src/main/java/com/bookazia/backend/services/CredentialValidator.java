package com.bookazia.backend.services;

import org.passay.*;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class CredentialValidator {
    public void isValidPassword(String password) {
        PasswordValidator validator = new PasswordValidator(Arrays.asList(
                new LengthRule(8, 30),
                new CharacterRule(EnglishCharacterData.Digit, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1),
                new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.Special, 1),
                new WhitespaceRule()));

        RuleResult result = validator.validate(new PasswordData(password));
        if (!result.isValid()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid password provided"
            );
        }
    }

    public void isValidEmail(String email) {
        final Pattern VALID_EMAIL_ADDRESS_REGEX = Pattern.compile("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,6}$", Pattern.CASE_INSENSITIVE);
        Matcher emailMatcher = VALID_EMAIL_ADDRESS_REGEX.matcher(email);
        if (!emailMatcher.matches()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "No valid email provided"
            );
        }
    }
}
