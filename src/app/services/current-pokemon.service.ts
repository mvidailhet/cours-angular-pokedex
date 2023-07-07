import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon';

@Injectable({
  providedIn: 'root',
})
export class CurrentPokemonService {
  pokemon: Pokemon | undefined;
}
