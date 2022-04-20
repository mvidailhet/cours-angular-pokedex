import { Component, ElementRef, ViewChild } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons.service';

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

  constructor(private pokemonsService: PokemonsService) {
    this.pokemons = this.pokemonsService.pokemons;
  }

  onAddPokemon() {
    this.pokemonAdded = this.pokemonsService.addPokemon(this.pokemonName);
    if (!this.pokemonAdded) return;
    this.pokemonName = '';
  }
}
