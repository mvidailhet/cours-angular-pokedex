import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PokemonApiItem } from 'src/app/models/pokemon';
import { PokeApiService } from 'src/app/services/poke-api.service';

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss'],
})
export class PokedexListComponent implements OnInit, OnDestroy {
  pokemonsApiList: PokemonApiItem[] = [];
  isLoading = true;
  // On crée l'oservable qui sera chargée de surveiller notre sujet
  pokemons$ = this.pokeApiService.pokemons.asObservable();
  @Input() currentPage: number | undefined;

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.pokeApiService.fetchPokemons(this.currentPage! - 1).subscribe();
  }

  // À la destruction du composant on se désabonne à l'observable
  ngOnDestroy() {
    this.pokemonsSubscription.unsubscribe();
  }

  // On s'abonne à l'observable puis on réalise les opérations que l'on désire avec les données reçues
  pokemonsSubscription = this.pokemons$.subscribe((newPokemonsApiList) => {
    this.pokemonsApiList = newPokemonsApiList;
    this.isLoading = false;
  });
}
