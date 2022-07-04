import { Component, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Memoize } from 'src/app/decorators/memoize';
import { PaginationInfo } from 'src/app/models/pokemon';
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
  urlNextPokemons!: string | null;
  urlPreviousPokemons!: string | null;
  isReady = false;

  constructor(private pokeApiService: PokeApiService, private router: Router) {}

  // À la destruction du composant on se désabonne à l'observable
  ngOnDestroy() {
    this.paginationInfoSubscription.unsubscribe();
  }

  // On s'abonne à l'observable puis on réalise les opérations que l'on désire avec les données reçues
  paginationInfoSubscription = this.pokeApiService.paginationInfo$.subscribe((paginationInfo: PaginationInfo) => {
    this.urlNextPokemons = paginationInfo.next;
    this.urlPreviousPokemons = paginationInfo.previous;
    this.totalPages = paginationInfo.totalPages;
    this.createPages();
    this.isReady = (!Number.isNaN(this.totalPages) || this.totalPages !== undefined) && this.pages.length !== 0;
    if (!this.isReady) console.error('Error: An error occured while creating the pagination');
  });

  goToPreviousPokemons() {
    if (!this.currentPage || !this.urlPreviousPokemons) return;
    const previousIndex = this.currentPage - 2;
    this.goToPagePokemons(previousIndex);
  }

  goToNextPokemons() {
    if (!this.currentPage || !this.urlNextPokemons) return;
    const nextIndex = this.currentPage;
    this.goToPagePokemons(nextIndex);
  }

  goToPagePokemons(pageIndex: number) {
    this.currentPage = pageIndex + 1;

    this.router.navigate(['/pokedex/page', this.currentPage]);
    this.pokeApiService.fetchPokemons(pageIndex).subscribe();
  }

  createPages() {
    for (let index = 0; index < this.totalPages; index++) {
      this.pages[index] = index + 1;
    }
  }

  @Memoize()
  isPaginationItemVisible(index: number, currentPage: number | undefined, totalPages: number) {
    if (!currentPage) return false;
    const indexIsNotFirstOrLast = index > 0 && index < totalPages - 1;
    const indexIsIn3FirstPages = currentPage <= 3 && index <= 2;
    const indexIsIn3LastPages = currentPage >= totalPages - 2 && index >= totalPages - 3;
    const indexIsNextToCurrentPage = index >= currentPage - 2 && index <= currentPage;
    return indexIsNotFirstOrLast && (indexIsIn3FirstPages || indexIsIn3LastPages || indexIsNextToCurrentPage);
  }
}
