import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokemonsService, Pokemon, PokemonTypeEnum } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input('pokemonIndex') index!: number;
  @Output() removeClick = new EventEmitter<string>();
  PokemonTypeEnum!: PokemonTypeEnum;
  keyOfType!: string;

  constructor(private pokemonsService: PokemonsService) {}
  ngOnInit() {
    const indexOfType = Object.values(PokemonTypeEnum).indexOf(this.pokemon.type);
    this.keyOfType = Object.keys(PokemonTypeEnum)[indexOfType];
  }

  generateColor() {
    return this.pokemon.level >= 50 ? '#00dd00' : '#882222';
  }

  onRemoveClick() {
    this.pokemonsService.removePokemon(this.pokemon.name, this.index);
  }
}
