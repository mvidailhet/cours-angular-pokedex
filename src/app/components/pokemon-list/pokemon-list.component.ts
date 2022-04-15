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
  pokemonAdded = false;
  pokemons: string[] = [];

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.allowNewPokemon = true;
    }, 5000);
  }

  onAddPokemon() {
    this.pokemonAdded = true;
    this.pokemons.push(this.pokemonName);
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    console.log(pokemonName + ' removed');
    this.pokemons.splice(pokemonIndex, 1);
  }

}
