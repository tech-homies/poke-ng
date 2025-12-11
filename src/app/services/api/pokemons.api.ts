import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PokemonDTO } from './pokemonDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsApi {
  readonly http = inject(HttpClient);

  getAllResource(): HttpResourceRef<PokemonDTO[]> {
    return httpResource<PokemonDTO[]>(() => `${environment.apiUrl}/pokemons`, {
      defaultValue: [],
    });
  }

  getOneResource(id: PokemonDTO['pokedex_id']): HttpResourceRef<PokemonDTO | undefined> {
    return httpResource<PokemonDTO>(() => `${environment.apiUrl}/pokemons/${id}`);
  }

  getOne(id: PokemonDTO['pokedex_id']): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`${environment.apiUrl}/pokemons/${id}`);
  }
}
