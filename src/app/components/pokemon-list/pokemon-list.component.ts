import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService, Pokemon } from 'src/app/services/pokemons.service';

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
  pokemons: Pokemon[] = [];
  @ViewChild('nameInput') nameInputElementRef: ElementRef | undefined;

  constructor(private pokemonsService: PokemonsService, private router: Router) {
    this.pokemons = this.pokemonsService.pokemons;
  }

  onAddPokemon() {
    this.pokemonAdded = this.pokemonsService.addPokemon(this.pokemonName);
    if (!this.pokemonAdded) return;
    this.pokemonName = '';
  }

  goToPokemonPage(pokemonIndex: number) {
    this.router.navigate([`/pokemon/${pokemonIndex}`]);
  }

  goToPokemonPageWithName(pokemonName: string) {
    this.router.navigate([`/pokemon/${pokemonName}`]);
  }
}
