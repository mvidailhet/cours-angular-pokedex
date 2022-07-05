import { Component, OnInit } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PokemonStat } from 'src/app/models/pokemon';
import { CurrentPokemonService } from 'src/app/services/current-pokemon.service';
import { ScreenResizeService } from 'src/app/services/screen-resize.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
  stats: PokemonStat[] | undefined;
  view: [number, number] = [700, 400];

  // options
  showYAxis: boolean = true;
  gradient: boolean = false;
  yAxisLabel: string = 'Country';
  showYAxisLabel: boolean = true;
  colorScheme: Color | string = {
    name: 'pokedex',
    domain: ['#0d6efd'],
    group: ScaleType.Linear,
    selectable: false,
  };

  constructor(private currentPokemonService: CurrentPokemonService, private screenResize: ScreenResizeService) {}

  ngOnInit(): void {
    this.stats = this.currentPokemonService.pokemon?.details.stats;
  }
}
