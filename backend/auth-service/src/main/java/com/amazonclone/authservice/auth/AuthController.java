package com.amazonclone.authservice.auth;

import com.amazonclone.authservice.auth.dto.AuthResponse;
import com.amazonclone.authservice.auth.dto.LoginRequest;
import com.amazonclone.authservice.auth.dto.RegisterRequest;
import com.amazonclone.authservice.auth.dto.UserDto;
import com.amazonclone.authservice.security.JwtPrincipal;
import com.amazonclone.authservice.security.JwtService;
import com.amazonclone.authservice.user.AppUser;
import com.amazonclone.authservice.user.Role;
import com.amazonclone.authservice.user.UserRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/auth")
public class AuthController {
  private final UserRepository users;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwt;

  public AuthController(UserRepository users, PasswordEncoder passwordEncoder, JwtService jwt) {
    this.users = users;
    this.passwordEncoder = passwordEncoder;
    this.jwt = jwt;
  }

  @PostMapping("/register")
  @ResponseStatus(HttpStatus.CREATED)
  public AuthResponse register(@Valid @RequestBody RegisterRequest req) {
    if (users.existsByEmailIgnoreCase(req.email())) {
      throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already registered");
    }

    String hash = passwordEncoder.encode(req.password());
    AppUser user = AppUser.create(req.name(), req.email().toLowerCase(), hash, Role.USER);
    users.save(user);

    return toAuthResponse(user);
  }

  @PostMapping("/login")
  public AuthResponse login(@Valid @RequestBody LoginRequest req) {
    AppUser user = users.findByEmailIgnoreCase(req.email())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

    if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
    }

    return toAuthResponse(user);
  }

  @GetMapping("/me")
  public UserDto me(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof JwtPrincipal p)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }

    AppUser user = users.findById(p.userId())
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized"));

    return new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
  }

  private AuthResponse toAuthResponse(AppUser user) {
    String token = jwt.generateToken(user);
    UserDto dto = new UserDto(user.getId(), user.getName(), user.getEmail(), user.getRole().name());
    return new AuthResponse(token, dto);
  }
}
