package com.amazonclone.authservice.security;

public record JwtPrincipal(String userId, String email, String role) {}
