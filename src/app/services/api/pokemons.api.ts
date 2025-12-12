import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { PokemonDTO } from './pokemonDTO';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokemonsApi {
  readonly http = inject(HttpClient);
  readonly resourceUrl = `${environment.apiUrl}/pokemons`;

  getAllResource(): HttpResourceRef<PokemonDTO[]> {
    return httpResource<PokemonDTO[]>(() => this.resourceUrl, {
      defaultValue: [],
    });
  }

  getOneResource(id: PokemonDTO['pokedex_id']): HttpResourceRef<PokemonDTO | undefined> {
    return httpResource<PokemonDTO>(() => `${this.resourceUrl}/${id}`);
  }

  getOne(id: PokemonDTO['pokedex_id']): Observable<PokemonDTO> {
    return this.http.get<PokemonDTO>(`${this.resourceUrl}/${id}`);
  }
}
