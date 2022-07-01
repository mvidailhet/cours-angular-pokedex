import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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
  currentPokemonName: string | undefined;
  paramsSubscription: Subscription | undefined;
  isLoading = true;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonsService) {}

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
    this.fetchCurrentPokemon();
  };

  fetchCurrentPokemon() {
    if (!this.currentPokemonName) return;
    this.pokemonService.fetchPokemonByName(this.currentPokemonName).subscribe((pokemon: Pokemon) => {
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  fetchPokemonById(pokemonIndex: number) {
    this.pokemonService.fetchPokemonById(pokemonIndex).subscribe((data) => {
      const pokemon: Pokemon = {
        name: data.name,
        url: `https://pokeapi.co/api/v2/pokemon/${data.id}`,
        data,
      };
      this.pokemon = pokemon;
      this.isLoading = false;
    });
  }

  goToPreviousPokemon() {
    const pokemonIndex = this.pokemon?.data.id;
    if (pokemonIndex === 1 || !pokemonIndex) return;
    this.fetchPokemonById(pokemonIndex - 1);
  }

  goToNextPokemon() {
    const pokemonIndex = this.pokemon?.data.id;
    if (!pokemonIndex) return;

    this.fetchPokemonById(pokemonIndex + 1);
  }
}
