import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  allowNewPokemon = false;
  pokemonAdditionStatus = 'Pas de Pokémon crée';
  pokemonName = '';

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.allowNewPokemon = true;
    }, 5000);
  }

  onAddPokemon() {
    this.pokemonAdditionStatus = 'Pokémon ajouté !';
  }

  onUpdatePokemonName(event: Event) {
    console.log(event);
    const inputElement = event.target as HTMLInputElement;
    this.pokemonName = inputElement.value;
  }

}