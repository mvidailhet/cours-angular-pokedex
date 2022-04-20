import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PokemonsService, Pokemon } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  @Input() pokemon!: Pokemon;
  @Input('pokemonIndex') index!: number;
  @Output() removeClick = new EventEmitter<string>();

  constructor(private pokemonsService: PokemonsService) {}

  generateColor() {
    return this.pokemon.level > 50 ? '#00dd00' : '#882222';
  }

  onRemoveClick() {
    this.pokemonsService.removePokemon(this.pokemon.name, this.index);
  }
}
