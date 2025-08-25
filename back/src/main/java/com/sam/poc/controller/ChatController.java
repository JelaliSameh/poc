package com.sam.poc.controller;


import com.sam.poc.dto.ChatMessage;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

//Contrôleur pour la gestion des messages et utilisateurs
@RestController
public class ChatController {
	// Stocke les messages en mémoire (remplace une base de données)
	
    public List<ChatMessage> chatMessageSaved = new ArrayList<>();
 // Endpoint REST pour récupérer l'historique des messages
    @GetMapping("/api/messages")
    public List<ChatMessage> getMessage(){
        return chatMessageSaved;
    }
    // Endpoint REST pour effacer l'historique des messages
    @DeleteMapping("/api/messages")
    public void removeMessage(){
        this.chatMessageSaved.clear();
    }

 // Gère l'envoi de messages via WebSocket
    @MessageMapping("/sendMessage")
    @SendTo("/topic/messages")
    public ChatMessage sendMessage(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor
    ) { // Sauvegarde et diffuse le message
        this.chatMessageSaved.add(chatMessage);
        return chatMessage;
    }
 // Gère la déconnexion d'utilisateurs
    @MessageMapping("/removeUser")
    @SendTo("/topic/messages")
    public ChatMessage removeUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor
    ) {// Sauvegarde et diffuse la notification de départ
        this.chatMessageSaved.add(chatMessage);
        return chatMessage;
    }
 // Gère la connexion de nouveaux utilisateurs
    @MessageMapping("/addUser")
    @SendTo("/topic/messages")
    public ChatMessage  addUser(@Payload ChatMessage chatMessage, SimpMessageHeaderAccessor headerAccessor
    ) {     // Sauvegarde et diffuse la notification d'arrivée
        this.chatMessageSaved.add(chatMessage);
        return chatMessage;
    }





}

