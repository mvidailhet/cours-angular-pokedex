import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  constructor(private httpClient: HttpClient) {}

  fetchPokemon(nbPokemons: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${nbPokemons}`;
    return this.httpClient.get<any>(url);
  }
}
