package com.bookazia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;


import java.util.Set;

@Entity
public class Category {
    @Id
    @GeneratedValue
    private long id;
    private String description;

    @Column(unique = true, nullable = false)
    private String nameEn;
    @Column(nullable = false)
    private String nameNl;

    @ManyToMany(mappedBy = "categories")
    @JsonIgnoreProperties("products")
    private Set<Product> products;

    public Category() {}

    public Category(String nameEn, String nameNl) {
        this.nameEn = nameEn;
        this.nameNl = nameNl;
    }

    public Category(String nameEn, String nameNl, String description) {
        this.nameEn = nameEn;
        this.nameNl = nameNl;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNameEn() {
        return nameEn;
    }
    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }
    public String getNameNl() {
        return nameNl;
    }
    public void setNameNl(String nameNl) {
        this.nameNl = nameNl;
        }

    public Set<Product> getProducts() {
        return products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }
}
