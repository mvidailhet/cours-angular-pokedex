import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit {
  pokemons: any[] = [];
  nbPokemonsToGet = 20;

  constructor(private apiService: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemonFromApi(this.nbPokemonsToGet);
    console.log('this.pokemons :', this.pokemons);
  }

  getPokemonFromApi(nbPokemonsToGet: number) {
    this.apiService.fetchPokemon(nbPokemonsToGet).subscribe((response) => {
      this.pokemons = [...response.results];
      console.log('response :', response);
    });
  }
}
