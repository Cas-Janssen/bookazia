package com.bookazia.backend.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

public class ProductDTO {
    public String title;
    public BigDecimal price;
    public int stock;
    public String isbn;
    public String descriptionEn;
    public String descriptionNl;
    public String CoverImgUrl;
    public LocalDate publicationDate;
    public String originalLanguage;
    public int pages;
    public Set<String> versions;
    public Set<Long> categoryIds;
    public Set<Long> authorIds;
    public Long publisherId;
    public boolean isEnabled;

    public ProductDTO(String title, BigDecimal price, int stock, String isbn, String descriptionEn, String descriptionNl, String coverImgUrl, LocalDate publicationDate, String originalLanguage, Set<Long> categoryIds, Set<Long> authorIds, Long publisherId, boolean isEnabled) {
        this.title = title;
        this.price = price;
        this.stock = stock;
        this.isbn = isbn;
        this.descriptionEn = descriptionEn;
        this.descriptionNl = descriptionNl;
        this.CoverImgUrl = coverImgUrl;
        this.publicationDate = publicationDate;
        this.originalLanguage = originalLanguage;
        this.categoryIds = categoryIds;
        this.authorIds = authorIds;
        this.publisherId = publisherId;
        this.isEnabled = isEnabled;
    }

}