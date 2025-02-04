package com.shortening.backend.backend.Controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shortening.backend.backend.DTOs.ShortenRequest;
import com.shortening.backend.backend.DTOs.ShortenDTO;
import com.shortening.backend.backend.Entities.Shorten;
import com.shortening.backend.backend.Repositories.ShortenRepository;

import jakarta.persistence.EntityNotFoundException;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/shorten")
@CrossOrigin(origins = "http://localhost:5173")
public class ShortenController {
    @Autowired 
    private ShortenRepository shortenRepository;


    @PostMapping
    public ResponseEntity<Object> createShorten(@RequestBody ShortenRequest request) {
        if ( request.getUrl().isBlank() ) {
            return ResponseEntity.badRequest().body(Map.of("error", "Invalid URL"));
        }
        Shorten shorten = new Shorten(request.getUrl());
        shortenRepository.save(shorten);
        
        return ResponseEntity.status(201).body(shorten); // created
    }
    
    @GetMapping("/{shortCode}")
    public ResponseEntity<Object> getShorten(@PathVariable String shortCode) {
        Shorten shorten = shortenRepository.findByShortCode(shortCode)
            .orElseThrow(()-> new EntityNotFoundException("Shortcode " + shortCode + " not found"));
        
        shorten.addAccessCount();
        shortenRepository.save(shorten);

        ShortenDTO shortenDTO = new ShortenDTO(shorten.getUrl(), shorten.getShortCode(), shorten.getCreatedAt(), shorten.getUpdatedAt());
        return ResponseEntity.ok(shortenDTO);
    }
    
    @PutMapping("/{shortCode}")
    public ResponseEntity<Object> updateShorten(@RequestBody ShortenRequest request, @PathVariable String shortCode) {
        Shorten shorten = shortenRepository.findByShortCode(shortCode)
            .orElseThrow(()-> new EntityNotFoundException("Shortcode " + shortCode + " not found"));
        
        shorten.updateURL(request.getUrl());
        shortenRepository.save(shorten);

        return ResponseEntity.ok(shorten);
    }

    @DeleteMapping("/{shortCode}")
    public ResponseEntity<Object> deleteShorten(@PathVariable String shortCode){
        Shorten shorten = shortenRepository.findByShortCode(shortCode)
            .orElseThrow(()-> new EntityNotFoundException("Shortcode " + shortCode + " not found"));

        shortenRepository.delete(shorten);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{shortCode}/stats")
    public ResponseEntity<Object> getShortenStats(@PathVariable String shortCode) {
        Shorten shorten = shortenRepository.findByShortCode(shortCode)
            .orElseThrow(()-> new EntityNotFoundException("Shortcode " + shortCode + " not found"));
        
        return ResponseEntity.ok(shorten);
    }
}
