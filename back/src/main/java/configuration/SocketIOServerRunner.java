package configuration;


import com.corundumstudio.socketio.SocketIOServer;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;


@Configuration
public class SocketIOServerRunner {

    private final SocketIOServer socketIOServer;
    private boolean serverRunning = false;
    private static final Logger logger = LoggerFactory.getLogger(SocketIOServerRunner.class);


    public SocketIOServerRunner(SocketIOServer socketIOServer) {
        this.socketIOServer = socketIOServer;
    }

    @PostConstruct
    public void startServer() {
        if (!serverRunning) {
            socketIOServer.addConnectListener(client -> System.out.println("Client connected: " + client.getSessionId()));
            socketIOServer.addDisconnectListener(client -> System.out.println("Client disconnected: " + client.getSessionId()));
            socketIOServer.start();
            serverRunning = true; // Marquer le serveur comme démarré
            logger.info("Socket.IO server started successfully.");
        } else {
            logger.warn("Socket.IO server is already running.");
        }
    }

    public SocketIOServer getSocket() {
        return this.socketIOServer;
    }

    @PreDestroy
    public void stopServer() {
        if (socketIOServer != null) {
            socketIOServer.stop();
            System.out.println("Socket.IO server stopped.");
        }
    }
}