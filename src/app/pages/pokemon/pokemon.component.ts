import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon';
import { CurrentPokemonService } from 'src/app/services/current-pokemon.service';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent implements OnInit, OnDestroy {
  pokemon: Pokemon | undefined | null;
  currentPokemonName: string | undefined;
  previousPokemonName: string | undefined;
  nextPokemonName: string | undefined;
  paramsSubscription: Subscription | undefined;
  isLoading = true;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private currentPokemonService: CurrentPokemonService,
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
    this.nextPokemonName = this.pokemonService.getNextApiPokemonName(this.currentPokemonName);
    this.previousPokemonName = this.pokemonService.getPreviousApiPokemonName(this.currentPokemonName);
    this.fetchCurrentPokemon();
  };

  fetchCurrentPokemon() {
    if (!this.currentPokemonName) return;
    this.pokemonService.fetchPokemonByName(this.currentPokemonName).subscribe((pokemon: Pokemon | null) => {
      if (!pokemon) return;
      this.pokemon = pokemon;
      this.currentPokemonService.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  fetchPokemonById(pokemonIndex: number) {
    this.pokemonService.fetchPokemonById(pokemonIndex).subscribe((pokemon: Pokemon | null) => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  goToPreviousPokemon() {
    const pokemonIndex = this.pokemon?.details.id;
    if (pokemonIndex === 1 || !pokemonIndex) return;

    this.fetchPokemonById(pokemonIndex - 1);
  }

  goToNextPokemon() {
    const pokemonIndex = this.pokemon?.details.id;
    if (!pokemonIndex) return;

    this.fetchPokemonById(pokemonIndex + 1);
  }
}
