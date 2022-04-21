import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pokemon, PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss'],
})
export class PokemonComponent {
  pokemon: Pokemon | undefined;
  previousPokemonName: string | undefined;
  nextPokemonName: string | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokemonService: PokemonsService,
    private router: Router,
  ) {}

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      const pokemonName = params.name;
      const pokemonIndex = this.pokemonService.findPokemonIndexByName(pokemonName);
      this.nextPokemonName = this.pokemonService.getNextPokemonName(pokemonName);
      this.previousPokemonName = this.pokemonService.getPreviousPokemonName(pokemonName);
      this.pokemon = {
        id: this.pokemonService.pokemons[pokemonIndex].id,
        name: pokemonName,
        level: this.pokemonService.pokemons[pokemonIndex].level,
      };
    });
  }

  goToPreviousPokemon() {
    if (!this.previousPokemonName) return;
    this.router.navigate(['/pokemon', this.previousPokemonName]);
  }

  goToNextPokemon() {
    if (!this.nextPokemonName) return;
    this.router.navigate(['/pokemon', this.nextPokemonName]);
  }
}
