package com.amazonclone.orderservice.orders;

import com.amazonclone.orderservice.security.JwtPrincipal;
import jakarta.validation.Valid;
import java.time.Instant;
import java.util.List;
import java.util.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/orders")
public class OrdersController {

  @GetMapping("/my")
  public List<OrderDto> myOrders(Authentication authentication) {
    principal(authentication);
    return List.of();
  }

  @PostMapping
  @ResponseStatus(HttpStatus.CREATED)
  public OrderDto create(@Valid @RequestBody CreateOrderRequest req, Authentication authentication) {
    JwtPrincipal p = principal(authentication);
    return new OrderDto(
        UUID.randomUUID().toString(),
        p.userId(),
        "CREATED",
        req.total(),
        req.currency(),
        Instant.now(),
        req.items());
  }

  private JwtPrincipal principal(Authentication authentication) {
    if (authentication == null || !(authentication.getPrincipal() instanceof JwtPrincipal p)) {
      throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Unauthorized");
    }
    return p;
  }
}
