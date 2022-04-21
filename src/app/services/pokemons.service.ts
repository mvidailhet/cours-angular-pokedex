import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

export interface Pokemon {
  id: number;
  name: string;
  level: number;
}

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokemons: Pokemon[] = [];

  constructor(private loggingService: LoggingService) {
    this.loadPokemonListFromStorage();
  }

  addPokemon(pokemonName: string): boolean {
    if (!pokemonName) return false;
    if (this.pokemonExists(pokemonName)) return false;
    this.pokemons.push({
      id: this.pokemons.length,
      name: pokemonName,
      level: Math.round(Math.random() * 100),
    });
    this.storePokemonList();
    this.loggingService.logItemCreated(pokemonName);
    return true;
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.pokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
    this.loggingService.logItemRemoved(pokemonName);
  }

  pokemonExists(pokemonName: string | undefined): boolean {
    // eslint-disable-next-line max-len
    return this.pokemons.findIndex((pokemon) => pokemon.name?.toLowerCase() === pokemonName?.toLowerCase()) > -1;
  }

  findPokemonIndexByName(name: string) {
    return this.pokemons.findIndex((pokemon) => pokemon.name === name);
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
