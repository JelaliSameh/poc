import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';
import { ChatSimulatorService } from './chat-simulator.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnDestroy {
  private socket: Socket | null = null;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private connectionStatus = new BehaviorSubject<string>('connecting');
  private messageQueue: Message[] = [];
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 3; // Réduit le nombre de tentatives
  private isConnected = false;
  private useSimulator = false;

  constructor(private chatSimulator: ChatSimulatorService) {
    this.initializeSocket();
  }

  private initializeSocket(): void {
    // Désactiver les tentatives de connexion Socket.IO pour éviter les erreurs
    console.log('Skipping Socket.IO connection, using simulator directly');
    this.useSimulator = true;
    this.connectionStatus.next('simulated');
  }

  private handleNewMessage(message: Message): void {
    const currentMessages = this.messagesSubject.getValue();
    
    // Ajouter le nouveau message EN HAUTEUR du tableau
    const updatedMessages = [message, ...currentMessages];
    
    this.messagesSubject.next(updatedMessages);
  }

  sendMessage(sender: string, content: string): void {
    if (this.useSimulator) {
      this.chatSimulator.sendMessage(sender, content);
      return;
    }

    const message: Message = {
      sender,
      content,
      timestamp: new Date()
    };

    if (this.isConnected && this.socket) {
      console.log('Sending message:', message);
      this.socket.emit('/topic/messages', message);
    } else {
      console.warn('Cannot send message: not connected. Queuing message.');
      this.messageQueue.push(message);
    }
  }

  watchMessages(): Observable<Message[]> {
    if (this.useSimulator) {
      return this.chatSimulator.watchMessages();
    }
    return this.messagesSubject.asObservable();
  }

  getConnectionStatus(): Observable<string> {
    if (this.useSimulator) {
      return this.chatSimulator.getConnectionStatus();
    }
    return this.connectionStatus.asObservable();
  }

  disconnect(): void {
    if (this.useSimulator) {
      this.chatSimulator.disconnect();
      return;
    }

    if (this.socket) {
      this.socket.disconnect();
      this.isConnected = false;
      this.connectionStatus.next('disconnected');
    }
  }

  manualReconnect(): void {
    if (this.useSimulator) {
      this.chatSimulator.manualReconnect();
      return;
    }

    console.log('Manual reconnection requested');
    this.reconnectAttempts = 0;
    
    if (this.socket) {
      this.socket.disconnect();
      setTimeout(() => {
        this.initializeSocket();
      }, 500);
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}