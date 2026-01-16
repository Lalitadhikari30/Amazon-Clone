package com.amazonclone.catalogservice.catalog;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.Instant;

@Entity
@Table(name = "products")
public class Product {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private String title;

  @Column
  private String brand;

  @Column(nullable = false)
  private String category;

  @Column(nullable = false)
  private Integer price;

  @Column(name = "mrp")
  private Integer mrp;

  @Column(nullable = false)
  private Double rating;

  @Column(name = "reviews_count")
  private Integer reviewsCount;

  @Column(nullable = false)
  private Boolean prime;

  @Column(nullable = false)
  private Integer stock;

  @Column(name = "image_url")
  private String imageUrl;

  @Column(name = "created_at")
  private Instant createdAt;

  protected Product() {}

  public Product(
      String title,
      String brand,
      String category,
      Integer price,
      Integer mrp,
      Double rating,
      Integer reviewsCount,
      Boolean prime,
      Integer stock,
      String imageUrl) {
    this.title = title;
    this.brand = brand;
    this.category = category;
    this.price = price;
    this.mrp = mrp;
    this.rating = rating;
    this.reviewsCount = reviewsCount;
    this.prime = prime;
    this.stock = stock;
    this.imageUrl = imageUrl;
    this.createdAt = Instant.now();
  }

  public Long getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getBrand() {
    return brand;
  }

  public String getCategory() {
    return category;
  }

  public Integer getPrice() {
    return price;
  }

  public Integer getMrp() {
    return mrp;
  }

  public Double getRating() {
    return rating;
  }

  public Integer getReviewsCount() {
    return reviewsCount;
  }

  public Boolean getPrime() {
    return prime;
  }

  public Integer getStock() {
    return stock;
  }

  public String getImageUrl() {
    return imageUrl;
  }

  public Instant getCreatedAt() {
    return createdAt;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public void setPrice(Integer price) {
    this.price = price;
  }

  public void setMrp(Integer mrp) {
    this.mrp = mrp;
  }

  public void setRating(Double rating) {
    this.rating = rating;
  }

  public void setReviewsCount(Integer reviewsCount) {
    this.reviewsCount = reviewsCount;
  }

  public void setPrime(Boolean prime) {
    this.prime = prime;
  }

  public void setStock(Integer stock) {
    this.stock = stock;
  }

  public void setImageUrl(String imageUrl) {
    this.imageUrl = imageUrl;
  }
}
