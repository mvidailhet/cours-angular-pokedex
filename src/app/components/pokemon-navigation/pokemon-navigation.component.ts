import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-navigation',
  templateUrl: './pokemon-navigation.component.html',
  styleUrls: ['./pokemon-navigation.component.scss'],
})
export class PokemonNavigationComponent {
  @Input() pokemonName: string | undefined;
  @Output() goToPreviousPokemonClick = new EventEmitter();
  @Output() goToNextPokemonClick = new EventEmitter();

  constructor(private pokemonService: PokemonsService, private router: Router) {}

  onGoToPreviousPokemon() {
    console.log('onPrev');
    this.goToPreviousPokemonClick.emit();
  }

  onGoToNextPokemon() {
    console.log('onNext');
    this.goToNextPokemonClick.emit();
  }
}
