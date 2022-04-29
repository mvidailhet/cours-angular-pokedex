import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/guards/prevent-pokemon-form-leave.guard';
import { PokemonsService } from 'src/app/services/pokemons.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements CanComponentDeactivate {
  loggedIn = false;

  constructor(private pokemonService: PokemonsService) {}

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
    if (!this.pokemonService.isAddingPokemon) return true;
    // eslint-disable-next-line no-restricted-globals
    return confirm('Vous voulez vraiment quitter la page sans finir la création du pokémon ?');
  }
}
