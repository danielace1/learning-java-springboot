package com.example.demo.services;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.CreateOrderRequest;
import com.example.demo.dto.OrderCreated;
import com.example.demo.dto.OrderItemDto;
import com.example.demo.entity.Order;
import com.example.demo.entity.OrderItem;
import com.example.demo.entity.Product;
import com.example.demo.repository.OrderRepository;
import com.example.demo.repository.ProductRepository;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    public OrderCreated createOrder(CreateOrderRequest orderRequest) {
        Order order = new Order();
        order.setStatus("PENDING");
        double totalItemsAmount = 0;

        for (OrderItemDto item : orderRequest.getOrderItems()) {
            OrderItem orderItem = new OrderItem();

            orderItem.setName(item.getName());
            orderItem.setPrice(item.getPrice());
            orderItem.setImage(item.getImage());
            orderItem.setQuantity(item.getQuantity());

            Product product = productRepository.findById(item.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));
            orderItem.setProduct(product);

            totalItemsAmount += item.getPrice() * item.getQuantity();

            order.getOrderItems().add(orderItem);
        }

        order.setTotalItemsAmount(totalItemsAmount);
        double totalAmount = 0;
        double taxAmount = 10;
        totalAmount = totalItemsAmount + taxAmount;

        order.setTotalAmount(totalAmount);
        order.setTaxAmount(taxAmount);

        String refId = UUID.randomUUID().toString();

        order.setReferenceId(refId);
        orderRepository.save(order);

        return new OrderCreated(refId);

    }

    public Order getOrder(String referenceId) {
        return orderRepository.findByReferenceId(referenceId)
                .orElseThrow(() -> new RuntimeException("No order found with reference id: " + referenceId));
    }
}
