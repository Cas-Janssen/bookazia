package com.bookazia.backend.controllers;

import com.bookazia.backend.dao.AuthorDAO;
import com.bookazia.backend.dto.AuthorDTO;
import com.bookazia.backend.models.Author;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://s1156741.student.inf-hsleiden.nl:16741")
@RequestMapping("/authors")
public class AuthorController {
    private final AuthorDAO authorDAO;

    public AuthorController(AuthorDAO authorDAO) {
        this.authorDAO = authorDAO;
    }

    @GetMapping
    public ResponseEntity<List<Author>> getAllAuthors() {
        return ResponseEntity.ok(this.authorDAO.getAllAuthors());
    }

    @GetMapping("{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author author = this.authorDAO.getAuthorById(id);
        return ResponseEntity.ok(author);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, String>> addAuthor(@RequestBody AuthorDTO authorDTO) {
        Author author = this.authorDAO.addAuthor(authorDTO);
        HashMap<String, String> response = new HashMap<>();
        response.put("message", "successfully added author: " + author);
        return ResponseEntity.ok(response);
    }

}
