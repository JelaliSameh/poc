package controller;

import com.corundumstudio.socketio.SocketIOClient;
import com.corundumstudio.socketio.SocketIOServer;
import configuration.SocketIOServerRunner;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import dto.ChatMessage;

@Component
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    private final SocketIOServerRunner server;


    public ChatController(SocketIOServerRunner server) {
        this.server = server;
    }

    @PostConstruct
    public void setupListener() {
        SocketIOServer socket = this.server.getSocket();
        socket.addEventListener("/topic/messages", ChatMessage.class, (client, message, ackSender) -> {
            onChatMessage(client, message);
        });
    }

    private void onChatMessage(SocketIOClient client, ChatMessage message) {
        logger.info("Received message from client {}: sender={}, content={}",
                client.getSessionId(),message.getSender(),message.getContent());
        try {
            // Diffuse the message to all connected clients
            //this.messageService.saveMessage(message);
            server.getSocket().getBroadcastOperations().sendEvent("chatMessage", message);

        } catch (Exception e) {
            logger.error("Error handling chat message: {}", e.getMessage(), e);
        }
    }
}