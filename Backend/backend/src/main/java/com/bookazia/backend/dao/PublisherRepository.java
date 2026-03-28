package com.bookazia.backend.dao;

import com.bookazia.backend.models.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Optional<Object> findPublisherByFirstNameAndLastName(String firstName, String lastName);
    List<Publisher> findAll();
    Optional<Publisher> findPublisherById(Long id);
}
