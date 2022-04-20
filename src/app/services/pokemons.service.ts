import { Injectable } from '@angular/core';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonsService {
  pokemons: string[] = [];

  constructor(private loggingService: LoggingService) {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);
  }

  addPokemon(pokemonName: string): boolean {
    if (!pokemonName) return false;
    if (this.pokemons.includes(pokemonName)) return false;
    this.pokemons.push(pokemonName);
    this.storePokemonList();
    this.loggingService.logItemCreated(pokemonName);
    return true;
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.pokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
    this.loggingService.logItemRemoved(pokemonName);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }
}
