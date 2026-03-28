package com.bookazia.backend.dao;

import com.bookazia.backend.models.CustomUser;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<CustomUser, Long> {
    Optional<CustomUser> findByEmail(String email);
}
