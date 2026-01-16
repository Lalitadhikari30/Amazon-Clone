package com.amazonclone.orderservice.security;

public record JwtPrincipal(String userId, String role) {}
