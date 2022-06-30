import { Component, Input, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent implements OnInit {
  @Input()
  public pokemon!: any;
  keyOfType!: string;
  isLoading = true;

  constructor(private pokeApiService: PokeApiService, private pkemonService: PokemonsService) {}

  ngOnInit() {
    this.getPokemonData();
  }

  getPokemonData() {
    console.log('this.pokemon :', this.pokemon);
    this.pkemonService.getPokemonData(this.pokemon.url).subscribe((data) => {
      this.pokemon.data = data;
      this.isLoading = false;
    });
  }
}
