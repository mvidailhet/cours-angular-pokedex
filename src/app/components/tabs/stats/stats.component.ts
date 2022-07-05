import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { PokemonStat } from 'src/app/models/pokemon';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  @Input() stats: PokemonStat[] | undefined;
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

  constructor(private router: Router) {
    const params = this.router.getCurrentNavigation()?.extras.state;
    this.stats = params?.stats;
    console.log(params);
  }
}
