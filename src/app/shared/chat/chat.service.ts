import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  public sendMessage(message: string, history: string): Observable<string> {
    const url = `gpt?text=I'm using chat in Tamagotchi game. Act as my Tamagotchi. Be nice and happy. Reply only with text and short messages. \n ${history.length > 0 ? 'Chat history:' : ''} ${history} \n Reply to this message: ${message}`;

    return this.httpClient
      .get(url, { responseType: 'text' })
      .pipe(map((response: any) => response as string));
  }
}
