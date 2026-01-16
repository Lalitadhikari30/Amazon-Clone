package com.amazonclone.orderservice.orders;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;

public record CreateOrderRequest(
    @NotNull List<Item> items,
    @NotBlank String currency,
    @NotNull Integer total
) {
  public record Item(
      @NotBlank String productId,
      @NotNull Integer quantity
  ) {}
}
