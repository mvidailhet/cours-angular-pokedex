import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-image',
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.scss'],
})
export class PokemonImageComponent {
  @Input() pokemon: Pokemon | undefined;
  @Input() isLoading = true;
  @Input() isSmall = false;
}
