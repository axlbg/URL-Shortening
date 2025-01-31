package com.shortening.backend.backend.Entities;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Shorten {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String url;

    @Column(nullable = false, unique = true)
    private String shortCode;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @Column(nullable = false)
    private LocalDateTime updatedAt;

    @Column(nullable = false)
    private int accessCount;

    public Shorten() {}
    public Shorten(String url){
        this.url = url;
        this.shortCode = this.generateShortCode();
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.accessCount = 0;
    }

    public String getUrl() {
        return url;
    }
    public String getShortCode() {
        return shortCode;
    }
    public String getCreatedAt() {
        return this.formatDate(createdAt);
    }
    public String getUpdatedAt() {
        return this.formatDate(updatedAt);
    }
    public int getAccessCount() {
        return accessCount;
    }

    private String generateShortCode() {
        return UUID.randomUUID().toString().substring(0, 8);
    }

    private String formatDate(LocalDateTime date) {
        return date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss'Z'"));
    }

    public void addAccessCount() {
        this.accessCount++;
    }

    public void updateURL(String url) {
        this.url = url;
        this.updatedAt = LocalDateTime.now();
    }
}
