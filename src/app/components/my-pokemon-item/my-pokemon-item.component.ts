import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-my-pokemon-item',
  templateUrl: './my-pokemon-item.component.html',
  styleUrls: ['./my-pokemon-item.component.scss'],
})
export class MyPokemonItemComponent implements OnInit {
  @Input() pokemon!: Pokemon;
  @Input() isLoading = true;
  @Input('pokemonIndex') index!: number;
  @Output() removeClick = new EventEmitter<string>();

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    console.log('this.pokemon :', this.pokemon);
  }

  onRemoveClick() {
    this.pokemonsService.removePokemon(this.pokemon.name, this.index);
  }
}
