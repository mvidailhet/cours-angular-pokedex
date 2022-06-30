import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap, Observable, of, throwError, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeApiService {
  nbPokemons: number = 21;
  // On crée les sujets que l'on souhaite que nos observables surveillent
  urlPokemons = new Subject<any>();
  pokemons = new Subject<any[]>();
  totalPages = new Subject<number>();

  constructor(private httpClient: HttpClient) {
    this.getTotalPages().subscribe();
  }

  callPokeApi(url: string): Observable<any> {
    return this.httpClient.get<any>(url).pipe(
      catchError((error) => {
        this.handleHttpError(error);
        return of([]);
      }),
    );
  }

  fetchPokemons(pageIndex: number = 0): Observable<any> {
    let offset: number | undefined;

    if (pageIndex !== 0) {
      offset = pageIndex * this.nbPokemons;
    }

    const url = `https://pokeapi.co/api/v2/pokemon?${offset ? `offset=${offset}&` : ''}limit=${this.nbPokemons}`;

    return this.callPokeApi(url).pipe(
      tap((response) => {
        console.log('response :', response);

        // On met à jour notre sujet
        this.pokemons.next(response.results);
        this.urlPokemons.next({
          next: response.next,
          previous: response.previous,
        });
      }),
    );
  }

  getTotalPages(): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.nbPokemons}$`;

    return this.callPokeApi(url).pipe(
      tap((response) => {
        // On met à jour notre sujet
        this.totalPages.next(Math.ceil(response.count / this.nbPokemons));
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
