import { Component, Input, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent implements OnInit {
  @Input()
  public pokemon!: any;
  keyOfType!: string;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit() {
    this.getPokemonData();
  }

  getPokemonData() {
    this.pokeApiService.callPokeApi(this.pokemon.url).subscribe((data) => {
      // eslint-disable-next-line no-param-reassign
      this.pokemon.data = data;
    });
  }
}
