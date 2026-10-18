package com.example.demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@ResponseBody

public class HomeController {

    @GetMapping("")
    public String getHomePage() {
        return "Welcome to Home Page!";
    }

    @GetMapping("/dashboard")
    public String getDashboardPage() {
        return "Login Successful!";
    }

}
