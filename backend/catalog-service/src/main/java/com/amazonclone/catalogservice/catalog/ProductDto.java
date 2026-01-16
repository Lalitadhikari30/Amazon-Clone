package com.amazonclone.catalogservice.catalog;

public record ProductDto(
    String id,
    String title,
    String brand,
    String category,
    int price,
    int mrp,
    double rating,
    int reviewsCount,
    boolean prime,
    int stock,
    String imageUrl
) {}
