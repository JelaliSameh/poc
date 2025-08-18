import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({ providedIn: 'root' })
export class ChatService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:8085', {
      transports: ['websocket'],
      withCredentials: true,
      autoConnect: true
    });
  }

  connect(onMessageReceived: (msg: any) => void) {
    this.socket.on('chatMessage', (message: any) => {
      onMessageReceived(message);
    });
  }

  sendMessage(sender: string, content: string) {
    this.socket.emit('sendMessage', { sender, content });
  }
}