import { Injectable } from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import SockJS from 'sockjs-client/dist/sockjs';



@Injectable({ providedIn: 'root' })
export class ChatService {
  private stompClient: Stomp.Client | null = null;
  private url = 'http://localhost:8080/ws/chat';

 connect(onMessageReceived: (msg: any) => void) {
  const socket = new SockJS(this.url);
  this.stompClient = new Stomp.Client({
    webSocketFactory: () => socket as any,
    onConnect: () => {
      console.log('Connecté au broker STOMP');
      this.stompClient?.subscribe('/topic/messages', (message) => {
        if (message.body) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },
    onStompError: (frame) => {
      console.error('Erreur STOMP : ', frame);
    },
  });

  this.stompClient.activate();
}

  sendMessage(sender: string, content: string) {
  if (this.stompClient && this.stompClient.connected) {
    this.stompClient.publish({
      destination: '/app/sendMessage',
      body: JSON.stringify({ sender, content })
    });
  } else {
    console.error('La connexion STOMP n’est pas active.');
  }
}
}
