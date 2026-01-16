package com.amazonclone.catalogservice.catalog;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/catalog")
public class CatalogController {
  private static final List<ProductDto> PRODUCTS = List.of(
      new ProductDto(
          "p-1",
          "Echo Dot (5th Gen) | Smart speaker with Alexa",
          "Amazon",
          "Electronics",
          4499,
          5499,
          4.6,
          128734,
          true,
          25,
          "https://images.unsplash.com/photo-1512446733611-9099a758e0c9?auto=format&fit=crop&w=1200&q=60"),
      new ProductDto(
          "p-2",
          "Wireless Noise Cancelling Headphones",
          "SoundPro",
          "Electronics",
          6999,
          9999,
          4.4,
          54321,
          true,
          18,
          "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=1200&q=60")
  );

  @GetMapping("/products")
  public List<ProductDto> listProducts() {
    return PRODUCTS;
  }

  @GetMapping("/products/{id}")
  public ProductDto getProduct(@PathVariable String id) {
    return PRODUCTS.stream()
        .filter(p -> p.id().equals(id))
        .findFirst()
        .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
  }
}
