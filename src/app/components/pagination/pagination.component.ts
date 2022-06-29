import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnDestroy {
  @Input() currentPage: number | undefined;
  totalPages!: number;
  pages: number[] = [];
  urlNextPokemons!: string;
  urlPreviousPokemons!: string;
  // On crée l'oservables qui seront chargées de surveiller nos sujets
  urlPokemons$ = this.pokeApiService.urlPokemons.asObservable();
  totalPages$ = this.pokeApiService.totalPages.asObservable();

  constructor(private pokeApiService: PokeApiService, private router: Router) {}

  // À la destruction du composant on se désabonne à l'observable
  ngOnDestroy() {
    this.urlPokemonsSubscription.unsubscribe();
    this.totalPagesSubscription.unsubscribe();
  }

  // On s'abonne à l'observable puis on réalise les opérations que l'on désire avec les données reçues
  urlPokemonsSubscription = this.urlPokemons$.subscribe((urls) => {
    this.urlNextPokemons = urls.next;
    this.urlPreviousPokemons = urls.previous;
  });

  totalPagesSubscription = this.totalPages$.subscribe((totalPages) => {
    this.totalPages = totalPages;
    this.getPage();
  });

  goToPreviousPokemons() {
    if (!this.urlPreviousPokemons || this.urlPreviousPokemons === null) return;
    this.router.navigate(['/pokedex', this.currentPage! - 1]);
    this.pokeApiService.callPokeApi(this.urlPreviousPokemons).subscribe();
  }

  goToNextPokemons() {
    if (!this.urlNextPokemons || this.urlNextPokemons === null) return;
    this.router.navigate(['/pokedex', this.currentPage! + 1]);
    this.pokeApiService.callPokeApi(this.urlNextPokemons).subscribe();
  }

  goToPagePokemons(pageIndex: number) {
    this.currentPage = pageIndex + 1;

    this.router.navigate(['/pokedex', this.currentPage]);
    this.pokeApiService.fetchPokemons(pageIndex).subscribe();
  }

  getPage() {
    // eslint-disable-next-line no-plusplus
    for (let index = 0; index < this.totalPages; index++) {
      this.pages[index] = index + 1;
    }
  }
}
