import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  constructor(private httpClient: HttpClient) {}

  public sendMessage(message: string): Observable<string> {
    return this.httpClient.get<string>(`pet?message=${message}`);
  }
}
