package com.amazonclone.catalogservice.storage;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class SupabaseStorageClient {
  private final String supabaseUrl;
  private final String supabaseAnonKey;
  private final String bucketName;
  private final HttpClient http;

  public SupabaseStorageClient(
      @Value("${supabase.url}") String supabaseUrl,
      @Value("${supabase.anon-key}") String supabaseAnonKey,
      @Value("${supabase.storage.bucket}") String bucketName) {
    this.supabaseUrl = supabaseUrl;
    this.supabaseAnonKey = supabaseAnonKey;
    this.bucketName = bucketName;
    this.http = HttpClient.newHttpClient();
  }

  public String upload(String fileName, String contentType, byte[] bytes) throws IOException, InterruptedException {
    String path = String.format("/storage/v1/object/%s/%s", bucketName, fileName);
    String url = supabaseUrl + path;

    HttpRequest request = HttpRequest.newBuilder()
        .uri(URI.create(url))
        .header("Authorization", "Bearer " + supabaseAnonKey)
        .header("apikey", supabaseAnonKey)
        .header("Content-Type", contentType)
        .POST(HttpRequest.BodyPublishers.ofBytes(bytes))
        .build();

    HttpResponse<String> response = http.send(request, HttpResponse.BodyHandlers.ofString());
    if (response.statusCode() != 200) {
      throw new RuntimeException("Upload failed: " + response.body());
    }

    // Public URL
    return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileName;
  }

  public String getPublicUrl(String fileName) {
    return supabaseUrl + "/storage/v1/object/public/" + bucketName + "/" + fileName;
  }
}
