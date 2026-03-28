package com.bookazia.backend.dto;

public class RegisterDTO {
        public String firstName;
        public String middleName;
        public String lastName;
        public String email;
        public String password;

        public RegisterDTO(String firstName, String middleName, String lastName, String email, String password) {
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
        }
}
