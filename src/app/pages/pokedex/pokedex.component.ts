import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.scss'],
})
export class PokedexComponent implements OnInit, OnDestroy {
  page: number | undefined;
  paramsSubscription: Subscription | undefined;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.paramsSubscription = this.activatedRoute.params.subscribe(this.handleRouteParams);
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
  }

  handleRouteParams = (params: Params) => {
    this.page = Number(params.page);
  };
}
