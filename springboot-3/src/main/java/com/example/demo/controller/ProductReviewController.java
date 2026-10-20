package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.ProductReviewDto;
import com.example.demo.services.ProductService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/products/reviews")
public class ProductReviewController {

    @Autowired
    private ProductService productService;

    @PostMapping
    public ResponseEntity<?> addReview(@RequestBody @Valid ProductReviewDto reviewDto) {
        productService.addReview(reviewDto);
        return ResponseEntity.status(HttpStatus.CREATED).body("Review added");
    }
}
