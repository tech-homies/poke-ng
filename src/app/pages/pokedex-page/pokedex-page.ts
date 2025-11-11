import {Component, inject} from '@angular/core';
import {PokemonsApi} from '../../shared/api/pokemons/pokemons-api';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-pokedex-page',
  imports: [
    MatProgressSpinner,
    MatButton
  ],
  templateUrl: './pokedex-page.html',
  styleUrl: './pokedex-page.css',
})
export default class PokedexPage {
  #pokemonsApi = inject(PokemonsApi);

  pokemons = this.#pokemonsApi.getAll();

  loadPokemons() {
    this.pokemons.reload();
  }
}
