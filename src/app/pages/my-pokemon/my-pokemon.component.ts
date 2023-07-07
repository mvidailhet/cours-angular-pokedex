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
  pokemon: Pokemon | undefined | null;
  currentPokemonName: string | undefined;
  previousPokemonName: string | undefined;
  nextPokemonName: string | undefined;
  paramsSubscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(this.handleRouteParams);
  }

  ngOnDestroy(): void {
    // Pas besoin de faire ça, Angular s'en occupe pour nous.
    // Mais pour l'exemple, on montre comment faire
    // Si cela n'est pas fait, la subscription reste dans la mémoire et crée une fuite mémoire
    this.paramsSubscription?.unsubscribe();
  }

  handleRouteParams = (params: Params) => {
    this.currentPokemonName = params.name;
    if (!this.currentPokemonName) return;
    this.previousPokemonName = this.pokemonService.getPreviousMyPokemonName(this.currentPokemonName);
    this.nextPokemonName = this.pokemonService.getNextMyPokemonName(this.currentPokemonName);
    this.fetchCurrentPokemon();
  };

  handleQueryParams = (queryParams: Params) => {
    console.log('query parameters :', queryParams);
  };

  handleFragment = (fragment: string | null) => {
    console.log(`fragment : ${fragment}`);
  };

  fetchCurrentPokemon() {
    if (!this.currentPokemonName) return;
    this.pokemonService.fetchPokemonByName(this.currentPokemonName).subscribe((pokemon: Pokemon | null) => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  goToPreviousPokemon() {
    if (!this.previousPokemonName) return;
    this.router.navigate(['/my-pokemon', this.previousPokemonName]);
  }

  goToNextPokemon() {
    if (!this.nextPokemonName) return;
    this.router.navigate(['/my-pokemon', this.nextPokemonName]);
  }
}
