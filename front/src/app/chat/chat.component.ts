import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule ici
import { CommonModule } from '@angular/common';
import { ChatMessage, WebsocketService } from '../services/websocket.sevice';
import { MessageService } from '../services/message.service';




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
// Composant principal du chat
export class ChatComponent implements OnInit {
  
  messages: any[] = [];
  message: string = '';
  protected username!: string;
  public numberOfMessages = 0;


  constructor(public chatService: WebsocketService, private messageService: MessageService) {}
  
  // Gère l'envoi/réception de messages et la connexion WebSocket
  ngOnInit(): void {
    // Souscription aux messages du WebSocket
    // Récupération de l'username depuis le localStorage
    this.chatService.getMessages().subscribe((message: ChatMessage) => {
      if (message.sender == null) {
        this.messages = [];
        return;
      }
      if (message.type === 'CHAT') {
        this.numberOfMessages++;
      }

      this.messages.push(message);
    });

    if (localStorage.getItem('username') != null) {
      this.chatService.connect(localStorage.getItem('username') as string);
    }
  }

// Envoie un message
  public sendMessage() {
    // Vérifie et envoie le message via le service WebSocket
    if (this.message.trim()) {
      const username = localStorage.getItem('username');
      const message: ChatMessage = {
        sender: localStorage.getItem('username'),
        content: this.message,
        type: 'CHAT',
        timestamp: new Date()
      };

      this.chatService.sendMessage(message);
      this.message = '';
    }
  }

  /**
   * Sets the CSS class for a message based on its type and sender
   * @param message message to evaluate
   * @returns 
   */
  // Détermine la classe CSS pour l'affichage des messages
  public getMessageClass(message: ChatMessage): string {
    // Différencie visuellement ses propres messages
    const baseClass = message.type.toLowerCase();
    const isOwnMessage = message.sender === localStorage.getItem('username') && message.type === 'CHAT';
    return isOwnMessage ? `${baseClass} own` : baseClass;
  }

  /**
   * Formats a timestamp to a readable time string
   * 
   * @param timestamp timestamp to format
   * @returns 
   */
  // Formatage de l'horodatage
  public formatTime(timestamp?: Date): string {
    // Convertit en format heure locale française
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  connect() {
    this.chatService.connect(this.username);
  }

  disconnect(): void {
    this.chatService.disconnect();
  }
}
