import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './my-pokemon.component.html',
  styleUrls: ['./my-pokemon.component.scss'],
})
export class MyPokemonComponent implements OnInit, OnDestroy {
  pokemon: Pokemon | undefined;
  previousPokemonName: string | undefined;
  nextPokemonName: string | undefined;
  paramsSubscription: Subscription | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(this.handleRouteParams);
    console.log('this.pokemon :', this.pokemon);
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
    const pokemonIndex = this.pokemonService.findApiPokemonIndexByName(pokemonName);
    this.nextPokemonName = this.pokemonService.getNextApiPokemonName(pokemonName);
    this.previousPokemonName = this.pokemonService.getPreviousApiPokemonName(pokemonName);
    this.pokemon = this.pokemonService.apiPokemons[pokemonIndex];
  };

  handleQueryParams = (queryParams: Params) => {
    console.log('query parameters :', queryParams);
  };

  handleFragment = (fragment: string | null) => {
    console.log(`fragment : ${fragment}`);
  };

  goToPreviousPokemon() {
    console.log('goToPreviousPokemon');
    if (!this.previousPokemonName) return;
    this.router.navigate(['/my-pokemon', this.previousPokemonName]);
  }

  goToNextPokemon() {
    console.log('goToNextPokemon');
    if (!this.nextPokemonName) return;
    this.router.navigate(['/my-pokemon', this.nextPokemonName]);
  }
}