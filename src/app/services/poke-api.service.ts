import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  nbPokemons: number = 21;

  constructor(private httpClient: HttpClient) {}

  callPokeApi(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }

  fetchPokemons(): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.nbPokemons}`;
    return this.callPokeApi(url);
  }
}
