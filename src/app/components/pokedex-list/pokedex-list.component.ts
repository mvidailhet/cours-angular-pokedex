import { Component, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit {
  pokemons: any[] = [];
  urlNextPokemons!: string;
  urlPreviousPokemons!: string;
  currentPage!: number;
  totalPage!: number;
  pages: any[] = [];
  isDisplayable!: boolean;

  constructor(private apiService: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemonsFromApi();
  }

  getPokemonsFromApi() {
    this.apiService.fetchPokemons().subscribe((response) => {
      this.updatePokemonsList(response);
      this.totalPage = Math.ceil(response.count / this.apiService.nbPokemons);
      this.getPages(this.totalPage);
    });
    this.currentPage = 1;
  }

  goToPreviousPokemons() {
    if (!this.urlPreviousPokemons || this.urlPreviousPokemons === null) return;
    this.apiService.callPokeApi(this.urlPreviousPokemons).subscribe((response) => {
      this.updatePokemonsList(response);
    });
    this.currentPage -= 1;
  }

  goToNextPokemons() {
    if (!this.urlNextPokemons || this.urlNextPokemons === null) return;
    this.apiService.callPokeApi(this.urlNextPokemons).subscribe((response) => {
      this.updatePokemonsList(response);
    });
    this.currentPage += 1;
  }

  goToPagePokemons(pageIndex: number) {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.apiService.nbPokemons}&offset=${this.pages[pageIndex].offset}`;

    this.apiService.callPokeApi(url).subscribe((response) => {
      this.updatePokemonsList(response);
    });

    this.currentPage = pageIndex + 1;
  }

  getPages(totalPage: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < totalPage; index++) {
      this.pages[index] = { offset: index * this.apiService.nbPokemons };
    }
    return this.pages;
  }

  updatePokemonsList(response: any) {
    this.pokemons = [...response.results];
    this.pokemons.forEach((pokemon) => {
      this.apiService.callPokeApi(pokemon.url).subscribe((data) => {
        // eslint-disable-next-line no-param-reassign
        pokemon.data = data;
      });
    });
    this.urlNextPokemons = response.next;
    this.urlPreviousPokemons = response.previous;
  }
}
