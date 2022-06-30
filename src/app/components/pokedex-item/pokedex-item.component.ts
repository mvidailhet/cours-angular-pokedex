import { Component, Input, OnInit } from '@angular/core';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent implements OnInit {
  @Input()
  public pokemon!: any;
  isLoading = true;

  constructor(private pkemonService: PokemonsService) {}

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
