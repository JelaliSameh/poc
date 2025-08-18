import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // <-- Import FormsModule ici
import { ChatService } from '../services/chat-service.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-chat',
  standalone: true, // <-- important, car c’est un composant standalone
  imports:  [CommonModule, FormsModule], // <-- ajoute FormsModule ici
  templateUrl: './chat-component.component.html',
  styleUrls: ['./chat-component.component.css']
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  message: string = '';
  sender = 'Client';

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.chatService.connect((msg) => {
      // Ajouter le nouveau message en haut du tableau
      this.messages = [msg, ...this.messages];
    });
  }

  send() {
    if (this.message.trim()) {
      // Ajouter immédiatement le message localement en haut
      this.messages = [{ sender: this.sender, content: this.message }, ...this.messages];
      
      this.chatService.sendMessage(this.sender, this.message);
      this.message = '';
    }
  }
}