package configuration;


import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SocketIOConfig {

    @Bean
     SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname("0.0.0.0");
        config.setPort(8085);
        config.setOrigin("http://localhost:4200");
        config.setPingInterval(25000); // Intervalle pour envoyer des pings (25s)
        config.setPingTimeout(60000); // Timeout avant de considérer la connexion inactive (60s)
        return new SocketIOServer(config);
    }
}