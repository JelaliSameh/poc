package com.sam.poc.configuration;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
	// Configure les règles CORS pour toutes les routes
  @Bean
  public WebMvcConfigurer corsConfigurer() {
    return new WebMvcConfigurer() {
      @Override
      public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Applique à toutes les routes
          .allowedOrigins("http://localhost:4200") // Autorise uniquement le frontend Angular
          .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Méthodes HTTP autorisée
          .allowedHeaders("*") // Autorise tous les headers
          .allowCredentials(true); // Autorise les cookies/credentials
      }
    };
  }
}
