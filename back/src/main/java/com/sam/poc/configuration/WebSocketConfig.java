package com.sam.poc.configuration;

import org.springframework.context.annotation.Configuration;

import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
//Configuration WebSocket avec STOMP pour la messagerie en temps réel
@Configuration
@EnableWebSocketMessageBroker // Active le broker de messages WebSocket
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws") // Endpoint pour se connecter au WebSocket
          .setAllowedOrigins("http://localhost:4200") // Autorise uniquement le frontend
          .withSockJS();  // Active le fallback SockJS pour les navigateurs sans support WebSocket
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.setApplicationDestinationPrefixes("/app"); // Préfixe pour les messages destinés aux méthodes annotées @MessageMapping
        registry.enableSimpleBroker("/topic"); // Active un broker simple pour les topics
    }
}
