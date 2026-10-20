package com.example.demo.seed;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.repository.ProductRepository;

@Component
public class ProductSeeder implements CommandLineRunner {
        @Autowired
        private ProductRepository productRepository;

        @Override
        public void run(String... args) throws Exception {
                if (productRepository.count() == 0) {
                        List<Product> demoProducts = List.of(
                                        new Product(null, "Apple iPhone 15", 89999.0, "Smartphone with A16 chip",
                                                        "Mobiles", 4.8, "Amazon", 5,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "Samsung Galaxy S24", 79999.0, "Flagship Android smartphone",
                                                        "Mobiles", 4.7, "Samsung", 10,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "OnePlus 12", 64999.0,
                                                        "High-performance smartphone with AMOLED display", "Mobiles",
                                                        4.6, "OnePlus", 8,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "MacBook Air M3", 114900.0,
                                                        "Lightweight laptop with Apple M3 chip", "Laptops", 4.9,
                                                        "Apple", 4,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "Dell XPS 15", 149999.0,
                                                        "Premium laptop for work and productivity", "Laptops", 4.5,
                                                        "Dell", 6,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "Sony WH-1000XM5", 29990.0,
                                                        "Wireless noise-cancelling headphones", "Audio", 4.7, "Sony",
                                                        12, List.of("/products/1.jpg")),
                                        new Product(null, "Apple AirPods Pro 2", 24900.0,
                                                        "Wireless earbuds with active noise cancellation", "Audio", 4.8,
                                                        "Apple", 15,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "Samsung 4K Smart TV", 54999.0,
                                                        "55-inch 4K UHD Smart LED television", "Televisions", 4.4,
                                                        "Samsung", 3,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "Logitech MX Master 3S", 9995.0,
                                                        "Wireless ergonomic productivity mouse", "Accessories", 4.6,
                                                        "Logitech", 20,
                                                        List.of("/products/1.jpg")),
                                        new Product(null, "iPad Air M2", 59900.0, "Tablet with Apple M2 chip",
                                                        "Tablets", 4.7, "Apple", 7,
                                                        List.of("/products/1.jpg")));

                        productRepository.saveAll(demoProducts);
                        System.out.println("Seeded Demo Products!");
                } else {
                        System.out.println("Products already exists! Skipping Seed");

                }

        }
}
