import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';
import { CurrentPokemonService } from 'src/app/services/current-pokemon.service';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent {
  @Input() pokemon: Pokemon | undefined;
  @Input() isLoading = true;

  constructor(public currentPokemonService: CurrentPokemonService) {}
}
