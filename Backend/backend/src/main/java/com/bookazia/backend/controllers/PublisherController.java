package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.PublisherDAO;
import com.bookazia.backend.dto.PublisherDTO;
import com.bookazia.backend.models.Publisher;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/publishers")
public class PublisherController {
    private final PublisherDAO publisherDAO;

    public PublisherController(PublisherDAO publisherDAO) {
        this.publisherDAO = publisherDAO;
    }

    @GetMapping
    public ResponseEntity<List<Publisher>> getAllPublishers() {
        return ResponseEntity.ok(this.publisherDAO.getAllPublishers());
    }

    @GetMapping("{id}")
    public ResponseEntity<Publisher> getPublisherById(@PathVariable Long id) {
        Publisher publisher = this.publisherDAO.getPublisherById(id);
        return ResponseEntity.ok(publisher);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, String>> addPublisher(@RequestBody PublisherDTO publisherDTO) {
        Publisher publisher = this.publisherDAO.addPublisher(publisherDTO);
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "successfully added publisher: " + publisher);
        return ResponseEntity.ok(response);
    }

}
