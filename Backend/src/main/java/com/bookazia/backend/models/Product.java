package com.bookazia.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;


import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Entity
public class Product {

    public Product() {}
    @Id
    @GeneratedValue
    private long id;
    private boolean isEnabled;
    private String title;
    private BigDecimal price;
    private int stock;
    private String isbn;
    @Column(columnDefinition = "TEXT")
    private String coverImgUrl;
    private LocalDate publicationDate;
    private int pages;

    @Column(columnDefinition = "TEXT")
    private String descriptionEn;
    @Column(columnDefinition = "TEXT")
    private String descriptionNl;

    @ElementCollection
    private Set<String> version;

    @Column(name = "original_language")
    private String originalLanguage;

    @ManyToMany
    @JoinTable(
            name = "ProductAuthors",
            joinColumns = @JoinColumn(name = "product_id"),
            inverseJoinColumns = @JoinColumn(name="author_id")
    )
    @JsonIgnoreProperties("products")
    private Set<Author> authors;

    @ManyToMany
    @JoinTable(
            name = "ProductCategory",
            joinColumns = @JoinColumn(name="product_id"),
            inverseJoinColumns = @JoinColumn(name="category_id")
    )
    @JsonIgnoreProperties("products")
    private Set<Category> categories;

    @ManyToOne
    @JoinColumn(name = "publisher_id", nullable = false)
    @JsonIgnoreProperties("products")
    private Publisher publisher;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<OrderProduct> orderProducts;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<CartItem> cartItems;

    @OneToMany(mappedBy = "product")
    @JsonIgnore
    private Set<SavedCartItem> savedCartItems;

    public Product(String title, BigDecimal price, int stock, String isbn, String descriptionEn, String descriptionNl, String coverImgUrl, LocalDate publicationDate, String originalLanguage, int pages, Set<String> version, Set<Author> authors, Set<Category> categories, Publisher publisher, boolean isEnabled) {
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.isbn = isbn;
        this.descriptionEn = descriptionEn;
        this.descriptionNl = descriptionNl;
        this.coverImgUrl = coverImgUrl;
        this.publicationDate = publicationDate;
        this.originalLanguage = originalLanguage;
        this.pages = pages;
        this.version = version;
        this.authors = authors;
        this.categories = categories;
        this.publisher = publisher;
        this.isEnabled = isEnabled;

    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public String getCoverImgUrl() {
        return coverImgUrl;
    }

    public void setCoverImgUrl(String coverImgUrl) {
        this.coverImgUrl = coverImgUrl;
    }

    public LocalDate getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(LocalDate publicationDate) {
        this.publicationDate = publicationDate;
    }

    public int getPages() {
        return pages;
    }

    public void setPages(int pages) {
        this.pages = pages;
    }

    public String getDescriptionEn() {
        return descriptionEn;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }
    public String getDescriptionNl() {
        return descriptionNl;
    }
    public void setDescriptionNl(String descriptionNl) {
        this.descriptionNl = descriptionNl;
    }

    public Set<String> getVersion() {
        return version;
    }

    public void setVersion(Set<String> version) {
        this.version = version;
    }

    public String getOriginalLanguage() {
        return originalLanguage;
    }

    public void setOriginalLanguage(String originalLanguage) {
        this.originalLanguage = originalLanguage;
    }

    public Set<Author> getAuthors() {
        return authors;
    }

    public void setAuthors(Set<Author> authors) {
        this.authors = authors;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Publisher getPublisher() {
        return publisher;
    }

    public void setPublisher(Publisher publisher) {
        this.publisher = publisher;
    }

    public Set<OrderProduct> getOrderProducts() {
        return orderProducts;
    }

    public void setOrderProducts(Set<OrderProduct> orderProducts) {
        this.orderProducts = orderProducts;
    }

    public Set<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
    }

    public void setSavedCartItems(Set<SavedCartItem> savedCartItems) {
        this.savedCartItems = savedCartItems;
    }

    public Set<SavedCartItem> getSavedCartItems() {
        return savedCartItems;
    }

    public void setEnabled(boolean isEnabled) {
        this.isEnabled = isEnabled;
    }

    public boolean isEnabled() {
        return isEnabled;
    }
}

