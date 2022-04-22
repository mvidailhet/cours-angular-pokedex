/* eslint-disable max-len */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon, PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon: Pokemon | undefined;
  previousPokemonName: string | undefined;
  nextPokemonName: string | undefined;
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
    const pokemonIndex = this.pokemonService.findPokemonIndexByName(pokemonName);
    this.nextPokemonName = this.pokemonService.getNextPokemonName(pokemonName);
    this.previousPokemonName = this.pokemonService.getPreviousPokemonName(pokemonName);
    this.pokemon = {
      id: this.pokemonService.pokemons[pokemonIndex].id,
      name: pokemonName,
      level: this.pokemonService.pokemons[pokemonIndex].level,
    };
  };

  handleQueryParams = (queryParams: Params) => {
    console.log('query parameters :', queryParams);
  };

  handleFragment = (fragment: string | null) => {
    console.log(`fragment : ${fragment}`);
  };

  goToPreviousPokemon() {
    if (!this.previousPokemonName) return;
    this.router.navigate(['/pokemon', this.previousPokemonName], { queryParams: { allowEdit: 1 }, fragment: 'test' });
  }

  goToNextPokemon() {
    if (!this.nextPokemonName) return;
    this.router.navigate(['/pokemon', this.nextPokemonName], { queryParams: { allowEdit: 1 }, fragment: 'test' });
  }
}
