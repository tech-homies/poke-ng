import {Component, computed, inject, signal} from '@angular/core';
import {Field, form, max, min, required} from "@angular/forms/signals";
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {PokemonsApi} from '../../shared/api/pokemons/pokemons-api';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-pokemon-page',
  imports: [
    Field,
    MatInput,
    MatFormField,
    MatError,
    MatLabel,
    MatProgressSpinner,
    JsonPipe
  ],
  templateUrl: './pokemon-page.html',
  styleUrl: './pokemon-page.css',
})
export default class PokemonPage {

  #pokemonsApi = inject(PokemonsApi);

  searchPokemonModel = signal({id: 0});

  form = form(this.searchPokemonModel, (p) => {
    required(p.id, {message: 'Pokemon ID is required'});
    min(p.id, 1, {message: 'Pokemon ID must be at least 1'});
    max(p.id, 2000, {message: 'Pokemon ID must be at most 2000'});
  });

  pokemon = this.#pokemonsApi.get(computed(() => this.form.id().valid() ? this.form.id().value() : undefined) );

}
