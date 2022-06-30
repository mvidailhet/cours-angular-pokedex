export interface Pokemon {
  name: string;
  url: string;
  data: PokemonData;
}

export interface PokemonData {
  id: number;
  image: PokemonOfficialArtwork;
  types: PokemonType[];
}

export interface PokemonType {
  slot: number;
  type: PokeApiEndpoint;
}

export interface PokemonOfficialArtwork {
  front_default: string;
}

export interface PokeApiEndpoint {
  name: string;
  url: string;
}
