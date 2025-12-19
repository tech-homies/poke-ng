import { TestBed } from '@angular/core/testing';

import { PokemonsApi } from './pokemons.api';

describe('PokemonsApi', () => {
  let service: PokemonsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
