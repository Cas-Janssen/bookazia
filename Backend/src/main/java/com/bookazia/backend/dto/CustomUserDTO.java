package com.bookazia.backend.dto;

public class CustomUserDTO {
    public String firstName;
    public String middleName;
    public String lastName;
    public String email;
    public String password;
    public String phoneNumber;
    public String address;
    public String city;
    public String postalCode;

    public CustomUserDTO(String firstName,String middleName, String lastName, String email, String password, String phoneNumber, String address, String city, String postalCode) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.city = city;
        this.postalCode = postalCode;
    }
}
