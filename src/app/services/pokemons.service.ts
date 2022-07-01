import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiPokemonResponse } from '../models/api-response';
import { Pokemon } from '../models/pokemon';
import { LoggingService } from './logging.service';
import { PokeApiService } from './poke-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  myPokemons: Pokemon[] = [];
  apiPokemons: Pokemon[] = [];
  isAddingPokemon = false;

  constructor(private loggingService: LoggingService, private pokeApiService: PokeApiService) {
    this.loadPokemonsApiListFromStorage();
  }

  fetchPokemon(url: string): Observable<Pokemon> {
    return this.pokeApiService.callPokeApi(url).pipe(
      map((data: ApiPokemonResponse) => {
        const newData = {
          name: data.name,
          url,
          details: {
            id: data.id,
            image: data.sprites.other!['official-artwork'].front_default,
            types: data.types,
          },
        };

        return newData;
      }),
    );
  }

  fetchPokemonByName(pokemonName: string): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    return this.fetchPokemon(url);
  }

  fetchPokemonById(pokemonIndex: number): Observable<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

    return this.fetchPokemon(url);
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.myPokemons.splice(pokemonIndex, 1);
    this.storePokemonsApiList();
    this.loggingService.logItemRemoved(pokemonName);
  }

  findMyPokemonIndexByName(name: string) {
    return this.myPokemons.findIndex((pokemon) => pokemon.name === name);
  }

  getPreviousPokemonName(currentPokemonName: string | undefined, pokemons: Pokemon[]): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = pokemons.findIndex((pokemon) => pokemon.name === currentPokemonName);
    if (pokemonIndex === 0) return undefined;
    return pokemons[pokemonIndex - 1]?.name;
  }

  getPreviousMyPokemonName(myPokemonName: string): string | undefined {
    return this.getPreviousPokemonName(myPokemonName, this.myPokemons);
  }

  getPreviousApiPokemonName(apiPokemonName: string): string | undefined {
    console.log('prev');
    return this.getPreviousPokemonName(apiPokemonName, this.apiPokemons);
  }

  getNextPokemonName(currentPokemonName: string | undefined, pokemons: Pokemon[]): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = pokemons.findIndex((pokemon) => pokemon.name === currentPokemonName);
    if (pokemonIndex === pokemons.length - 1) return undefined;
    return pokemons[pokemonIndex + 1]?.name;
  }

  getNextMyPokemonName(myPokemonName: string): string | undefined {
    return this.getNextPokemonName(myPokemonName, this.myPokemons);
  }

  getNextApiPokemonName(apiPokemonName: string): string | undefined {
    console.log('next');
    return this.getNextPokemonName(apiPokemonName, this.apiPokemons);
  }

  loadPokemonsApiListFromStorage() {
    const storagePokemons = localStorage.getItem('my_pokemons');
    if (!storagePokemons) return;
    this.myPokemons = JSON.parse(storagePokemons);
  }

  storePokemonsApiList() {
    localStorage.setItem('my_pokemons', JSON.stringify(this.myPokemons));
  }
}
