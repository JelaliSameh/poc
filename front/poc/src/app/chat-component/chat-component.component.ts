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
    this.chatService.connect((msg) => this.messages.push(msg));
  }

  send() {
    if (this.message.trim()) {
      this.chatService.sendMessage(this.sender, this.message);
      this.message = '';
    }
  }
}
