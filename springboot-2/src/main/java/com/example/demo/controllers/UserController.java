package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.UserEntity;
import com.example.demo.exceptions.ResourceNotFound;
import com.example.demo.models.User;
import com.example.demo.repository.UserRepository;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

@RestController

@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<UserEntity> getUsers() {
        // return Arrays.asList(new User(1L, "Sudharsan", "sudharsan@gmail.com"),
        // new User(2L, "Daniel", "daniel@gmail.com"), new User(3L, "Stephen",
        // "stephen@gmail.com"));

        return userRepository.findAll();
    }

    @PostMapping
    public UserEntity createUser(@RequestBody UserEntity user) {
        // System.out.println("User data: " + user.getName() + ", " + user.getEmail());
        return userRepository.save(user);
    }

    @GetMapping("/{id}")
    public UserEntity getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResourceNotFound("User not found with id:" + id));
    }

    @PutMapping("/{id}")
    public UserEntity updateUser(@PathVariable Long id, @RequestBody UserEntity user) {
        UserEntity userData = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("User not found with id:" + id));

        userData.setName(user.getName());
        userData.setEmail(user.getEmail());

        return userRepository.save(userData);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        UserEntity userData = userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFound("User not found with id:" + id));

        userRepository.delete(userData);

        return ResponseEntity.ok().build();
    }
}
