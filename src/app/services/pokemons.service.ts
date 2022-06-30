import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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
    this.loadPokemonListFromStorage();
  }

  getPokemonData(url: string): Observable<any> {
    return this.pokeApiService.callPokeApi(url).pipe(
      map((data) => ({
        id: data.id,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types,
        name: data.name,
      })),
    );
  }

  fetchPokemonByName(pokemonName: string): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    return this.getPokemonData(url);
  }

  fetchPokemonById(pokemonIndex: number): Observable<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}`;

    return this.getPokemonData(url);
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.myPokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
    this.loggingService.logItemRemoved(pokemonName);
  }

  findPokemonIndexByName(name: string, pokemons: Pokemon[]) {
    return pokemons.findIndex((pokemon) => pokemon.name === name);
  }

  findMyPokemonIndexByName(name: string) {
    return this.findPokemonIndexByName(name, this.myPokemons);
  }

  findApiPokemonIndexByName(name: string) {
    return this.findPokemonIndexByName(name, this.apiPokemons);
  }

  getPreviousPokemonName(currentPokemonName: string | undefined, pokemons: Pokemon[]): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName, pokemons);
    if (pokemonIndex === 0) return undefined;
    return pokemons[pokemonIndex - 1]?.name;
  }

  getPreviousMyPokemonName(myPokemonName: string): string | undefined {
    return this.getPreviousPokemonName(myPokemonName, this.myPokemons);
  }
  getPreviousApiPokemonName(apiPokemonName: string): string | undefined {
    return this.getPreviousPokemonName(apiPokemonName, this.apiPokemons);
  }

  getNextPokemonName(currentPokemonName: string | undefined, pokemons: Pokemon[]): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName, pokemons);
    if (pokemonIndex === pokemons.length - 1) return undefined;
    return pokemons[pokemonIndex + 1]?.name;
  }

  getNextMyPokemonName(myPokemonName: string): string | undefined {
    return this.getNextPokemonName(myPokemonName, this.myPokemons);
  }
  getNextApiPokemonName(apiPokemonName: string): string | undefined {
    return this.getNextPokemonName(apiPokemonName, this.apiPokemons);
  }

  loadPokemonListFromStorage() {
    const storagePokemons = localStorage.getItem('my_pokemons');
    if (!storagePokemons) return;
    this.myPokemons = JSON.parse(storagePokemons);
  }

  storePokemonList() {
    localStorage.setItem('my_pokemons', JSON.stringify(this.myPokemons));
  }
}
