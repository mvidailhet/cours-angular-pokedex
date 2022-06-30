import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon, PokemonType } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-my-pokemon-list',
  templateUrl: './my-pokemon-list.component.html',
  styleUrls: ['./my-pokemon-list.component.scss'],
})
export class MyPokemonListComponent {
  pokemonName = '';
  pokemonType: PokemonType | undefined;
  pokemonTypeToFilter: PokemonType | undefined;
  pokemons: Pokemon[] = [];

  constructor(private pokemonsService: PokemonsService, private router: Router) {
    this.pokemons = this.pokemonsService.myPokemons;
  }

  goToPokemonPage(pokemonIndex: number) {
    this.router.navigate([`/pokemon/${pokemonIndex}`]);
  }

  goToPokemonPageWithName(pokemonName: string) {
    this.router.navigate([`/pokemon/${pokemonName}`]);
  }
}
