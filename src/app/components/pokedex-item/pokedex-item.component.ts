import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pokedex-item',
  templateUrl: './pokedex-item.component.html',
  styleUrls: ['./pokedex-item.component.scss'],
})
export class PokedexItemComponent {
  @Input()
  public pokemon!: any;
}
