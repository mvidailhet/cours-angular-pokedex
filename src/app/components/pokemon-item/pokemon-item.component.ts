import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
})
export class PokemonItemComponent implements OnInit {
  level = Math.round(Math.random() * 100);

  constructor() {}

  ngOnInit(): void {}
}
