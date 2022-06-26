import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  nbPokemons: number = 63;

  constructor(private httpClient: HttpClient) {}

  fetchPokemons(): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.nbPokemons}`;
    return this.httpClient.get<any>(url);
  }

  fetchOtherPokemons(url: string): Observable<any> {
    // console.log('url :', url);
    return this.httpClient.get<any>(url);
  }

  fetchPokemonData(url: string): Observable<any> {
    return this.httpClient.get<any>(url);
  }
}
