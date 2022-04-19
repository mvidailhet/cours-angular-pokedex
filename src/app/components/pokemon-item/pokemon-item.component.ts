import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent {
  level = Math.round(Math.random() * 100);
  @Input('pokemonName') name = '';
  @Output() removeClick = new EventEmitter<string>();

  generateColor() {
    return this.level > 50 ? '#00dd00' : '#882222';
  }

  onRemoveClick() {
    this.removeClick.emit(this.name);
  }
}
