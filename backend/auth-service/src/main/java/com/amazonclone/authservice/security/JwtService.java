package com.amazonclone.authservice.security;

import com.amazonclone.authservice.user.AppUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.Map;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class JwtService {
  private final String issuer;
  private final SecretKey key;
  private final long expirationMinutes;

  public JwtService(
      @Value("${app.jwt.issuer}") String issuer,
      @Value("${app.jwt.secret}") String secret,
      @Value("${app.jwt.expiration-minutes}") long expirationMinutes) {
    this.issuer = issuer;
    this.expirationMinutes = expirationMinutes;
    byte[] raw = secret.getBytes(StandardCharsets.UTF_8);
    this.key = Keys.hmacShaKeyFor(raw);
  }

  public String generateToken(AppUser user) {
    Instant now = Instant.now();
    Instant exp = now.plus(expirationMinutes, ChronoUnit.MINUTES);

    return Jwts.builder()
        .setIssuer(issuer)
        .setSubject(user.getId())
        .setIssuedAt(Date.from(now))
        .setExpiration(Date.from(exp))
        .addClaims(Map.of(
            "email", user.getEmail(),
            "name", user.getName(),
            "role", user.getRole().name()))
        .signWith(key, SignatureAlgorithm.HS256)
        .compact();
  }

  public Claims parse(String token) {
    return Jwts.parserBuilder()
        .requireIssuer(issuer)
        .setSigningKey(key)
        .build()
        .parseClaimsJws(token)
        .getBody();
  }
}
