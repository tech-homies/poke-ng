import {Injectable, Signal} from '@angular/core';
import {httpResource, HttpResourceRef} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {PokemonDto} from './pokemon-dto';

@Injectable({
  providedIn: 'root',
})
export class PokemonsApi {
  public getAll(): HttpResourceRef<PokemonDto[]> {
    return httpResource<PokemonDto[]>(() => `${environment.apiUrl}/pokemons`, { defaultValue: []});
  }

  public get(id: Signal<number | undefined>): HttpResourceRef<PokemonDto | undefined> {
    return httpResource<PokemonDto>(() => id() ? `${environment.apiUrl}/pokemons/${id()}` : undefined);
  }
}
