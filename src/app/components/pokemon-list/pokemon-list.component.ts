import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  allowNewPokemon = true;
  pokemonAdditionStatus = 'Pas de Pokémon crée';
  pokemonName = '';
  pokemonAdded = false;
  pokemons: string[] = [];
  @ViewChild('nameInput') nameInputElementRef: ElementRef | undefined;

  constructor(private loggingService: LoggingService) {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  onAddPokemon() {
    if (!this.pokemonName) return;
    if (this.pokemons.includes(this.pokemonName)) return;
    this.pokemons.push(this.pokemonName);
    this.storePokemonList();
    this.loggingService.logItemCreated(this.pokemonName);
    this.pokemonName = '';
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    this.pokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
    this.loggingService.logItemRemoved(pokemonName);
  }
}
