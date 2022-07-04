import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of, throwError, Subject } from 'rxjs';
import { PaginationInfo, PokemonApiItem, PokemonsApiList } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  nbPokemonsPerPage: number = 21;
  // On crée les sujets que l'on souhaite que nos observables surveillent
  paginationInfo = new Subject<PaginationInfo>();
  pokemons = new Subject<PokemonApiItem[]>();
  // On crée l'oservables qui seront chargées de surveiller nos sujets
  paginationInfo$ = this.paginationInfo.asObservable();

  constructor(private httpClient: HttpClient) {}

  callPokeApi<T>(url: string): Observable<T | null> {
    return this.httpClient.get<T>(url).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return of(null);
      }),
    );
  }

  fetchPokemons(pageIndex: number = 0): Observable<PokemonsApiList | null> {
    let offset: number | undefined;

    if (pageIndex !== 0) {
      offset = pageIndex * this.nbPokemonsPerPage;
    }

    const url = `https://pokeapi.co/api/v2/pokemon?${offset ? `offset=${offset}&` : ''}limit=${this.nbPokemonsPerPage}`;

    return this.callPokeApi<PokemonsApiList>(url).pipe(
      tap((pokemonList: PokemonsApiList | null) => {
        if (!pokemonList) return;
        const newPaginationInfo = {
          next: pokemonList.next,
          previous: pokemonList.previous,
          totalPages: Math.ceil(pokemonList.count / this.nbPokemonsPerPage),
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
