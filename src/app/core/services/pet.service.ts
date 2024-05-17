import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPet } from '../models/pet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  constructor(private httpClient: HttpClient) {}

  public getPet(id: string): Observable<IPet> {
    return this.httpClient.get<IPet>(`pet?petId=${id}`);
  }
}
