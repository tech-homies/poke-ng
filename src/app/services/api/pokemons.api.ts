import { Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PokemonDTO } from './pokemonDTO';

@Injectable({
  providedIn: 'root',
})
export class PokemonsApi {
  getAllResource(): HttpResourceRef<PokemonDTO[]> {
    return httpResource<PokemonDTO[]>(() => `${environment.apiUrl}/pokemons`, {
      defaultValue: [],
    });
  }

  getOneResource(id: Signal<PokemonDTO['pokedex_id']>): HttpResourceRef<PokemonDTO | undefined> {
    return httpResource<PokemonDTO>(() => `${environment.apiUrl}/pokemons/${id()}`);
  }
}
