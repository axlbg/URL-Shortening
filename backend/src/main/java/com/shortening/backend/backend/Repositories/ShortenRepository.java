package com.shortening.backend.backend.Repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shortening.backend.backend.Entities.Shorten;

public interface ShortenRepository extends JpaRepository<Shorten, Long>{
    Optional<Shorten> findByShortCode(String shortCode);
}
