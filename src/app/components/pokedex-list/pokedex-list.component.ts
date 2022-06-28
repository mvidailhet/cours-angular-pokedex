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
  isLoading = true;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.getPokemonsFromApi();
  }

  getPokemonsFromApi() {
    this.pokeApiService.fetchPokemons().subscribe((response) => {
      this.updatePokemonsList(response);
      this.totalPage = Math.ceil(response.count / this.pokeApiService.nbPokemons);
      this.getPages(this.totalPage);
    });
    this.currentPage = 1;
  }

  goToPreviousPokemons() {
    if (!this.urlPreviousPokemons || this.urlPreviousPokemons === null) return;
    this.pokeApiService.callPokeApi(this.urlPreviousPokemons).subscribe((response) => {
      this.updatePokemonsList(response);
    });
    this.currentPage -= 1;
  }

  goToNextPokemons() {
    if (!this.urlNextPokemons || this.urlNextPokemons === null) return;
    this.pokeApiService.callPokeApi(this.urlNextPokemons).subscribe((response) => {
      this.updatePokemonsList(response);
    });
    this.currentPage += 1;
  }

  goToPagePokemons(pageIndex: number) {
    const { offset } = this.pages[pageIndex];

    this.pokeApiService.fetchPokemons(offset).subscribe((response) => {
      this.updatePokemonsList(response);
    });

    this.currentPage = pageIndex + 1;
  }

  getPages(totalPage: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < totalPage; index++) {
      this.pages[index] = { offset: index * this.pokeApiService.nbPokemons };
    }
    return this.pages;
  }

  updatePokemonsList(response: any) {
    this.pokemons = response.results;
    this.urlNextPokemons = response.next;
    this.urlPreviousPokemons = response.previous;
    this.isLoading = false;
  }
}
