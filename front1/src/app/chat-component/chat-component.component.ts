import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { Message } from '../models/message';

import { ChatService } from '../services/chat-service.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: Message[] = [];
  message: string = '';
  sender = 'Client';
  private subscription: Subscription | null = null;
  private connectionSubscription: Subscription | null = null;
  connectionStatus: string = 'Connecting...';
  isConnected: boolean = false;
  isSimulated: boolean = false;

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    // S'abonner aux messages
    this.subscription = this.chatService.watchMessages().subscribe((messages: Message[]) => {
      console.log('Messages updated:', messages);
      this.messages = messages;
    });

    // S'abonner aux changements d'état de connexion
    this.connectionSubscription = this.chatService.getConnectionStatus().subscribe(status => {
      this.connectionStatus = status;
      this.isConnected = status === 'connected' || status === 'simulated';
      this.isSimulated = status === 'simulated';
      console.log('Connection status changed:', status);
    });
  }

  send() {
    if (this.message.trim()) {
      console.log('Sending message from component:', this.message);
      this.chatService.sendMessage(this.sender, this.message);
      
      // Effacer le champ de message après envoi
      this.message = '';
    }
  }

  reconnect() {
    this.chatService.manualReconnect();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.connectionSubscription) {
      this.connectionSubscription.unsubscribe();
    }
    this.chatService.disconnect();
  }
}