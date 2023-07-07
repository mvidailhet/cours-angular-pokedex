import { Pipe, PipeTransform } from '@angular/core';
import { Pokemon, PokemonType } from '../models/pokemon';

@Pipe({
  name: 'pokemonTypeFilter',
  pure: false,
})
export class PokemonTypeFilterPipe implements PipeTransform {
  transform(pokemons: Pokemon[], type: PokemonType | undefined): Pokemon[] {
    if (!pokemons || !type || type.type.name === '') return pokemons;
    return pokemons.filter((pokemon) =>
      pokemon.details.types.map((pokemonType) => pokemonType.type.name === type.type.name),
    );
  }
}
