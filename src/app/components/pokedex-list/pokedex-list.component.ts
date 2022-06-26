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
      this.pokemons = [...response.results];
      this.urlNextPokemons = response.next;
      this.urlPreviousPokemons = response.prev;
      this.totalPage = Math.ceil(response.count / this.apiService.nbPokemons);
      this.getPages(this.totalPage);
      this.currentPage = 1;
      console.log('this.currentPage :', this.currentPage);
      console.log('response :', response);
      console.log('this.totalPage - 3 :', this.totalPage - 3);
      // console.log('this.urlNextPokemons :', this.urlNextPokemons);
      // console.log('this.urlPreviousPokemons :', this.urlPreviousPokemons);
    });
  }

  goToPreviousPokemons() {
    if (!this.urlPreviousPokemons || this.urlPreviousPokemons === null) return;
    this.apiService.fetchOtherPokemons(this.urlPreviousPokemons).subscribe((response) => {
      this.pokemons = [...response.results];
      this.urlNextPokemons = response.next;
      this.urlPreviousPokemons = response.previous;
      this.currentPage -= 1;
      console.log('this.currentPage :', this.currentPage);

      // console.log('response :', response);
    });
  }

  goToNextPokemons() {
    if (!this.urlNextPokemons || this.urlNextPokemons === null) return;
    this.apiService.fetchOtherPokemons(this.urlNextPokemons).subscribe((response) => {
      this.pokemons = [...response.results];
      this.urlNextPokemons = response.next;
      this.urlPreviousPokemons = response.previous;
      this.currentPage += 1;
      console.log('this.currentPage :', this.currentPage);

      // console.log('response :', response);
    });
  }

  goToPagePokemons(pageIndex: number) {
    console.log('pageIndex :', pageIndex);
    console.log('this.pages[pageIndex].offset :', this.pages[pageIndex].offset);
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${this.apiService.nbPokemons}&offset=${this.pages[pageIndex].offset}`;

    this.apiService.fetchOtherPokemons(url).subscribe((response) => {
      console.log('url :', url);
      this.pokemons = [...response.results];
      this.urlNextPokemons = response.next;
      this.urlPreviousPokemons = response.previous;
      // console.log('response :', response);
    });

    this.currentPage = pageIndex + 1;
    console.log('pageIndex :', pageIndex);
    console.log('this.currentPage :', this.currentPage);
  }

  getPages(totalPage: number) {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < totalPage; index++) {
      this.pages[index] = { offset: index * this.apiService.nbPokemons };
    }
    console.log('this.pages :', this.pages);
    return this.pages;
  }
}
