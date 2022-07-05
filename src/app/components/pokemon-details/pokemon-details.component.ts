import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { CurrentPokemonService } from 'src/app/services/current-pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  pokemon: Pokemon | undefined;
  @Input() isLoading = true;

  constructor(private currentPokemonService: CurrentPokemonService) {}

  ngOnInit(): void {
    this.pokemon = this.currentPokemonService.pokemon;
  }
}
