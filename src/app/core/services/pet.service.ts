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

  public feedPet(petId: string, foodId: string): Observable<IPet> {
    return this.httpClient.post<IPet>(
      `pet/feed?petId=${petId}&foodId=${foodId}`,
      null
    );
  }

  public washPet(petId: string, bathroomId: string): Observable<IPet> {
    return this.httpClient.post<IPet>(
      `pet/wash?petId=${petId}&bathroomId=${bathroomId}`,
      null
    );
  }

  public sleepPet(petId: string, bedroomId: string): Observable<IPet> {
    return this.httpClient.post<IPet>(
      `pet/sleep?petId=${petId}&bedroomId=${bedroomId}`,
      null
    );
  }

  public lvlUpPet(petId: string): Observable<IPet> {
    return this.httpClient.post<IPet>(`pet/lvl-up?petId=${petId}`, null);
  }

  public playPet(petId: string, gameId: string): Observable<IPet> {
    return this.httpClient.post<IPet>(
      `pet/play?petId=${petId}&gameId=${gameId}`,
      null
    );
  }
}
