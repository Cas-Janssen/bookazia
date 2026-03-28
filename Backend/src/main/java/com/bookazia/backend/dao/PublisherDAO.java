package com.bookazia.backend.dao;

import com.bookazia.backend.dto.PublisherDTO;
import com.bookazia.backend.models.Publisher;
import com.bookazia.backend.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;

@Component
public class PublisherDAO {
    private final PublisherRepository publisherRepository;
    private final UserService userService;

    public PublisherDAO(PublisherRepository publisherRepository, UserService userService) {
        this.publisherRepository = publisherRepository;
        this.userService = userService;
    }

    public List<Publisher> getAllPublishers() {
        return this.publisherRepository.findAll();
    }

    public Publisher addPublisher(PublisherDTO publisher) {
        if (!this.userService.checkIfUserIsAdmin()) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED,
                    "You are not authorized to add a publisher"
            );
        }
        if (publisher.firstName == null || publisher.firstName.isEmpty() || publisher.lastName == null || publisher.lastName.isEmpty()) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Publisher name is required"
            );
        }
        if (publisherRepository.findPublisherByFirstNameAndLastName(publisher.firstName, publisher.lastName).isPresent()) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT,
                    "Publisher already exists"
            );
        }
        Publisher newPublisher = new Publisher(publisher.firstName, publisher.lastName);
        return publisherRepository.save(newPublisher);
    }

    public Publisher getPublisherById(Long id) {
        Optional<Publisher> publisherOptional = this.publisherRepository.findPublisherById(id);
        if (publisherOptional.isPresent()) {
            return publisherOptional.get();
        } else {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Publisher does not exists!"
            );
        }
    }
}
