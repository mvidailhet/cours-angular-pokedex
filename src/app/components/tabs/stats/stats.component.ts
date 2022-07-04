import { Component } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss'],
})
export class StatsComponent {
  single: any[];
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

  constructor() {
    this.single = [
      {
        name: 'Germany',
        value: 40632,
        extra: {
          code: 'de',
        },
      },
      {
        name: 'United States',
        value: 50000,
        extra: {
          code: 'us',
        },
      },
      {
        name: 'France',
        value: 36745,
        extra: {
          code: 'fr',
        },
      },
      {
        name: 'United Kingdom',
        value: 36240,
        extra: {
          code: 'uk',
        },
      },
      {
        name: 'Spain',
        value: 33000,
        extra: {
          code: 'es',
        },
      },
      {
        name: 'Italy',
        value: 35800,
        extra: {
          code: 'it',
        },
      },
    ];
  }
}
