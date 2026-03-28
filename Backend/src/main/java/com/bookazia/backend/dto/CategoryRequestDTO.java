package com.bookazia.backend.dto;

public class CategoryRequestDTO {
    public String nameEn;
    public String nameNl;
    public String description;

    public CategoryRequestDTO(String nameEn, String nameNl, String description) {
        this.nameEn = nameEn;
        this.nameNl = nameNl;
        this.description = description;
    }
}
