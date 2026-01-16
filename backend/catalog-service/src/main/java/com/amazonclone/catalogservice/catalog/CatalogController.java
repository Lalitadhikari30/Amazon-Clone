package com.amazonclone.catalogservice.catalog;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/catalog")
public class CatalogController {
  private final ProductRepository products;
  private final SupabaseStorageClient storage;

  public CatalogController(ProductRepository products, SupabaseStorageClient storage) {
    this.products = products;
    this.storage = storage;
  }

  @GetMapping("/products")
  public List<ProductDto> listProducts(@RequestParam(required = false) String category) {
    List<Product> list = category != null
        ? products.findByCategoryIgnoreCase(category)
        : products.findAll();
    return list.stream().map(this::toDto).toList();
  }

  @GetMapping("/products/{id}")
  public ResponseEntity<ProductDto> getProduct(@PathVariable Long id) {
    return products.findById(id)
        .map(p -> ResponseEntity.ok(toDto(p)))
        .orElse(ResponseEntity.notFound().build());
  }

  private ProductDto toDto(Product p) {
    return new ProductDto(
        p.getId().toString(),
        p.getTitle(),
        p.getBrand(),
        p.getCategory(),
        p.getPrice(),
        p.getMrp(),
        p.getRating(),
        p.getReviewsCount(),
        p.getPrime(),
        p.getStock(),
        p.getImageUrl() != null ? p.getImageUrl() : storage.getPublicUrl("fallback.jpg"));
  }
}
