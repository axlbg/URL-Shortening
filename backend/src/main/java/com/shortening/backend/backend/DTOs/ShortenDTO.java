package com.shortening.backend.backend.DTOs;

public class ShortenDTO {
    final String url;
    final String shortCode;
    final String createdAt;
    final String updatedAt;
    
    public ShortenDTO(String url, String shortCode, String createdAt, String updatedAt) {
        this.url = url;
        this.shortCode = shortCode;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    public String getUrl() {
        return url;
    }
    public String getShortCode() {
        return shortCode;
    }
    public String getCreatedAt() {
        return createdAt;
    }
    public String getUpdatedAt() {
        return updatedAt;
    }
}
