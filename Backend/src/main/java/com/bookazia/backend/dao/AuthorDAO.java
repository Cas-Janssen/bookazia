package com.bookazia.backend.dao;

import com.bookazia.backend.dto.AuthorDTO;
import com.bookazia.backend.models.Author;
import com.bookazia.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class AuthorDAO {
    private final AuthorRepository authorRepository;
    private final UserService userService;

    public AuthorDAO(AuthorRepository authorRepository, UserService userService) {
        this.authorRepository = authorRepository;
        this.userService = userService;
    }


    public List<Author> getAllAuthors() {
        return this.authorRepository.findAll();
    }

    public Author addAuthor(AuthorDTO authorDTO) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to add a Author"
            );
        }
        if (authorDTO.firstName == null || authorDTO.firstName.isEmpty() || authorDTO.lastName == null || authorDTO.lastName.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Author name is required"
            );
        }
        if (authorRepository.findAuthorByFirstNameAndLastName(authorDTO.firstName, authorDTO.lastName).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Author already exists"
            );
        }
        Author newAuthor = new Author(authorDTO.firstName, authorDTO.lastName, "");
        return authorRepository.save(newAuthor);
    }

    public Author getAuthorById(Long id) {
        Optional<Author> authorOptional = this.authorRepository.findAuthorById((id));
        if (authorOptional.isPresent()) {
            return authorOptional.get();
        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Author does not exists!"
            );
        }
    }
}
