import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent implements OnInit {
  @Input()
  public pokemon!: Pokemon;
  isLoading = true;

  constructor(private pokemonService: PokemonsService, private router: Router) {}

  ngOnInit() {
    this.getPokemonData();
  }

  getPokemonData() {
    console.log('this.pokemon :', this.pokemon);
    this.pokemonService.getPokemonData(this.pokemon.url).subscribe((data) => {
      this.pokemon.data = data;
      this.isLoading = false;
    });
  }

  goToPokemon() {
    this.router.navigate([`/pokemon/${this.pokemon.name}`]);
  }
}
