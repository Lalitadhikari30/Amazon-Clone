package com.amazonclone.orderservice.orders;

import java.time.Instant;
import java.util.List;

public record OrderDto(
    String id,
    String userId,
    String status,
    int total,
    String currency,
    Instant createdAt,
    List<CreateOrderRequest.Item> items
) {}
