import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Message } from '../models/message';

@Injectable({
  providedIn: 'root'
})
export class ChatSimulatorService {
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  private connectionStatus = new BehaviorSubject<string>('simulated');

  constructor() {
    console.log('Chat simulator initialized - running in simulated mode');
  }

  // Simuler l'envoi d'un message
  sendMessage(sender: string, content: string): void {
    const message: Message = {
      sender,
      content,
      timestamp: new Date()
    };

    console.log('Simulating message sending:', message);
    
    // Ajouter le message avec un léger délai pour simuler le réseau
    setTimeout(() => {
      const currentMessages = this.messagesSubject.getValue();
      
      // Ajouter le nouveau message EN HAUTEUR du tableau
      const updatedMessages = [message, ...currentMessages];
      
      this.messagesSubject.next(updatedMessages);
    }, 300);
  }

  // Simuler la réception de messages
  watchMessages(): Observable<Message[]> {
    return this.messagesSubject.asObservable();
  }

  // Simuler le statut de connexion
  getConnectionStatus(): Observable<string> {
    return this.connectionStatus.asObservable();
  }

  // Simuler la déconnexion
  disconnect(): void {
    console.log('Simulated disconnect');
    this.connectionStatus.next('disconnected');
  }

  // Simuler la reconnexion
  manualReconnect(): void {
    console.log('Simulated reconnection');
    this.connectionStatus.next('connected');
  }
}