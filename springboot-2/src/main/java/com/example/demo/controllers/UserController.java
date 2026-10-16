package com.example.demo.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.User;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController

@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    // public String getMethodName(@RequestParam String param) {
    // return new String();
    // }

    public List<User> getUsers() {
        return Arrays.asList(new User(1L, "Sudharsan", "sudharsan@gmail.com"),
                new User(2L, "Daniel", "daniel@gmail.com"), new User(3L, "Stephen", "stephen@gmail.com"));
    }
}
