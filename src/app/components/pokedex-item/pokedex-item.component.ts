import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon, PokemonApiItem } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent implements OnInit {
  @Input()
  public pokemonApiItem!: PokemonApiItem;
  public pokemon!: Pokemon | null;
  isLoading = true;

  constructor(private pokemonService: PokemonsService, private router: Router) {}

  ngOnInit() {
    this.fetchPokemon();
  }

  fetchPokemon() {
    this.pokemonService.fetchPokemon(this.pokemonApiItem.url).subscribe((pokemon: Pokemon | null) => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  goToPokemon() {
    this.router.navigate([`/pokemon/${this.pokemonApiItem.name}`]);
  }
}
