import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon: Pokemon | undefined;
  paramsSubscription: Subscription | undefined;
  queryParamsSubscription: Subscription | undefined;
  fragmentSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(this.handleRouteParams);
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(this.handleQueryParams);
    this.fragmentSubscription = this.activatedRoute.fragment.subscribe(this.handleFragment);
  }

  ngOnDestroy(): void {
    // Pas besoin de faire ça, Angular s'en occupe pour nous.
    // Mais pour l'exemple, on montre comment faire
    // Si cela n'est pas fait, la subscription reste dans la mémoire et crée une fuite mémoire
    this.paramsSubscription?.unsubscribe();
  }

  handleRouteParams = (params: Params) => {
    const pokemonName = params.name;
    console.log('pokemonName :', pokemonName);
    const pokemonIndex = this.pokemonService.findPokemonIndexByName(pokemonName);
    this.pokemon = this.pokemonService.pokemons[pokemonIndex];
  };

  handleQueryParams = (queryParams: Params) => {
    console.log('query parameters :', queryParams);
  };

  handleFragment = (fragment: string | null) => {
    console.log(`fragment : ${fragment}`);
  };

  goToPreviousPokemon() {
    console.log('pokedexPrev');
  }

  goToNextPokemon() {
    console.log('pokedexNext');
  }
}
