import { POKEMON_STAT_NAME } from './enums/pokemon-stats';

export interface PokemonsApiList {
  count: number;
  next: string;
  previous: string | null;
  results: PokemonApiItem[];
}

export interface PokemonApiItem {
  name: string;
  url: string;
}

export interface Pokemon {
  name: string;
  url: string;
  details: PokemonDetails;
}

export interface PokemonDetails {
  id: number;
  image: string;
  types: PokemonType[];
  stats: PokemonStat[];
}

export interface PokemonType {
  slot: number;
  type: PokeApiEndpoint;
}

export interface OfficialArtwork {
  front_default: string;
}

export interface PokeApiEndpoint {
  name: string;
  url: string;
}

export interface PaginationInfo {
  next: string | null;
  previous: string | null;
  totalPages: number;
}

export interface PokemonStat {
  value: number;
  name: POKEMON_STAT_NAME;
}
