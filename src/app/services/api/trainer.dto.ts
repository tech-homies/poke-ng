import { PokemonDTO } from './pokemonDTO';

export type TrainerDTO = {
  id: number;
  name: string;
  avatarUrl: string;
  description: string;
  age: number;
  hometown: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  favoritePokemon?: PokemonDTO['pokedex_id'];
};
