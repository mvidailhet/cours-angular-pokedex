import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Pokemon } from '../models/pokemon';
import { LoggingService } from './logging.service';
import { PokeApiService } from './poke-api.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokemons: Pokemon[] = [];
  isAddingPokemon = false;

  constructor(private loggingService: LoggingService, private pokeApiService: PokeApiService) {
    this.loadPokemonListFromStorage();
  }

  getPokemonData(url: string): Observable<any> {
    // console.log('pokemon :', pokemon);
    return this.pokeApiService.callPokeApi(url).pipe(
      map((data) => ({
        id: data.id,
        image: data.sprites.other['official-artwork'].front_default,
        types: data.types,
      })),
    );
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.pokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
    this.loggingService.logItemRemoved(pokemonName);
  }

  pokemonExists(pokemonName: string | undefined): boolean {
    return this.pokemons.findIndex((pokemon) => pokemon.name?.toLowerCase() === pokemonName?.toLowerCase()) > -1;
  }

  findPokemonIndexByName(name: string) {
    return this.pokemons.findIndex((pokemon) => pokemon.name === name);
  }

  getPreviousPokemonName(currentPokemonName: string | undefined): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    if (pokemonIndex === 0) return undefined;
    return this.pokemons[pokemonIndex - 1].name;
  }

  getNextPokemonName(currentPokemonName: string | undefined): string | undefined {
    if (!currentPokemonName) throw new Error("Can't find Pokemon");
    const pokemonIndex = this.findPokemonIndexByName(currentPokemonName);
    if (pokemonIndex === this.pokemons.length - 1) return undefined;
    return this.pokemons[pokemonIndex + 1].name;
  }

  loadPokemonListFromStorage() {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }
}
