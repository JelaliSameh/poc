

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import { ChatMessage } from "./websocket.sevice";

// Service pour les appels HTTP vers l'API messages
@Injectable({
  providedIn: 'root'
})

export class MessageService {

  private pathService = 'http://localhost:8080/api/messages';
  public constructor(private http: HttpClient) {
  }
// Récupère l'historique des messages
  public getMessages() {
    return this.http.get<ChatMessage[]>(`${this.pathService}`);

  }
  // Efface l'historique des messages
  public clearMessages() {
    return this.http.delete<any>(`${this.pathService}`);

  }

}
