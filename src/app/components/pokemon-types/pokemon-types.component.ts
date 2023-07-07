import { Component, Input } from '@angular/core';
import { PokemonType } from 'src/app/models/pokemon';

@Component({
  selector: 'app-pokemon-types',
  templateUrl: './pokemon-types.component.html',
  styleUrls: ['./pokemon-types.component.scss'],
})
export class PokemonTypesComponent {
  @Input() types: PokemonType[] | undefined;
}
