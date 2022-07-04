import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of, throwError, Subject } from 'rxjs';
import { PokemonApiItem, PokemonsApiList } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  nbPokemons: number = 21;
  // On crée les sujets que l'on souhaite que nos observables surveillent
  paginationInfo = new Subject<any>();
  pokemons = new Subject<PokemonApiItem[]>();
  // On crée l'oservables qui seront chargées de surveiller nos sujets
  paginationInfo$ = this.paginationInfo.asObservable();

  constructor(private httpClient: HttpClient) {}

  callPokeApi(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return of([]);
      }),
    );
  }

  fetchPokemons(pageIndex: number = 0): Observable<PokemonsApiList> {
    let offset: number | undefined;

    if (pageIndex !== 0) {
      offset = pageIndex * this.nbPokemons;
    }

    const url = `https://pokeapi.co/api/v2/pokemon?${offset ? `offset=${offset}&` : ''}limit=${this.nbPokemons}`;

    return this.callPokeApi(url).pipe(
      tap((pokemonList: PokemonsApiList) => {
        const newPaginationInfo = {
          next: pokemonList.next,
          previous: pokemonList.previous,
          totalPages: Math.ceil(pokemonList.count / this.nbPokemons),
        };
        // On met à jour notre sujet
        this.pokemons.next(pokemonList.results);
        this.paginationInfo.next(newPaginationInfo);
      }),
    );
  }

  handleHttpError(error: HttpErrorResponse) {
    switch (error.status) {
      case 404:
        console.error('Error: The requested url does not exist');
        break;
      default:
        console.error('Error: An error occured requesting the api');
    }

    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
