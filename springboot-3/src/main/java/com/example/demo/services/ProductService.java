package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.example.demo.dto.ProductDto;
import com.example.demo.dto.ProductImageDto;
import com.example.demo.dto.ProductReviewDto;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductReview;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductReviewRepository;
import com.example.demo.spec.ProductSpecification;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private ProductReviewRepository productReviewRepository;

    public Map<String, Object> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<Product> products = productRepository.findAll(pageable);

        List<ProductDto> productDtos = products.stream().map(this::converToDto).collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("products", productDtos);
        response.put("totalProducts", products.getTotalElements());

        return response;
    }

    public ProductDto converToDto(Product product) {
        ProductDto dto = new ProductDto();
        dto.setId(product.getId());
        dto.setName(product.getName());
        dto.setPrice(product.getPrice());
        dto.setDescription(product.getDescription());
        dto.setRatings(product.getRatings());
        dto.setCategory(product.getCategory());
        dto.setSeller(product.getSeller());
        dto.setStock(product.getStock());
        dto.setNumOfReviews(product.getNumOfReviews());

        List<ProductReviewDto> reviewDtos = product.getReviews().stream().map(review -> {
            ProductReviewDto reviewDto = new ProductReviewDto();
            reviewDto.setId(review.getId());
            reviewDto.setComment(review.getComment());
            reviewDto.setRating(review.getRating());
            return reviewDto;
        }).collect(Collectors.toList());

        List<ProductImageDto> imageDtos = product.getImages().stream().map(image -> {
            ProductImageDto imageDto = new ProductImageDto(image.getPublicId());
            return imageDto;
        }).collect(Collectors.toList());

        dto.setImages(imageDtos);

        return dto;

    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with the id: " + id));
    }

    public List<Product> searchProducts(String category, Double minPrice, Double maxPrice, String keyword,
            Double ratings) {
        Specification<Product> spec = Specification.where(ProductSpecification.hasCategory(category))
                .and(ProductSpecification.priceBetween(minPrice, maxPrice))
                .and(ProductSpecification.hasNameOrDescLike(keyword))
                .and(ProductSpecification.ratingGreaterthan(ratings));

        return productRepository.findAll(spec);

    }

    public void addReview(ProductReviewDto reviewDto) {
        Product product = productRepository.findById(reviewDto.getId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        ProductReview review = new ProductReview();
        review.setComment(reviewDto.getComment());
        review.setRating(reviewDto.getRating());
        review.setProduct(product);
        productReviewRepository.save(review);
    }

}
