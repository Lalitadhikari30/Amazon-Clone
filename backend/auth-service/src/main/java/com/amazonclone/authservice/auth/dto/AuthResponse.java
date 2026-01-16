package com.amazonclone.authservice.auth.dto;

public record AuthResponse(String token, UserDto user) {}
