package com.bookazia.backend.dao;

import com.bookazia.backend.models.Author;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Object> findAuthorByFirstNameAndLastName(String firstName, String lastName);
    Optional<Author> findAuthorById(long id);
}
