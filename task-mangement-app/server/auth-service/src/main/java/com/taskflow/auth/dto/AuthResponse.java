package com.taskflow.auth.dto;

public record AuthResponse(
        Long id,
        String name,
        String email,
        String message,
        String token) {

}
