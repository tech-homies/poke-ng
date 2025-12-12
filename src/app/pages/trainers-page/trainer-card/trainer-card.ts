import { Component, effect, inject, input, OnInit, signal, Signal } from '@angular/core';
import { TrainerDTO } from '../../../services/api/trainer.dto';
import {
  MatCard,
  MatCardActions,
  MatCardAvatar,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle,
} from '@angular/material/card';
import { TeamsApi } from '../../../services/api/teams.api';
import { MatButton, MatIconButton } from '@angular/material/button';
import { PokemonDTO } from '../../../services/api/pokemonDTO';
import { PokemonsApi } from '../../../services/api/pokemons.api';
import { concatAll, concatMap, from, Observable, switchMap, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-trainer-card',
  imports: [
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
    MatButton,
    MatIcon,
    MatIconButton,
  ],
  templateUrl: './trainer-card.html',
  styleUrl: './trainer-card.scss',
})
export class TrainerCard {
  readonly trainer = input.required<TrainerDTO>();
  readonly #teamsApi = inject(TeamsApi);
  readonly #pokemonsApi = inject(PokemonsApi);

  readonly pokemons = toSignal(
    toObservable(this.trainer).pipe(
      switchMap((trainer) => this.#teamsApi.getTrainerTeam(trainer)),
      map((team) => team.pokemons),
      switchMap((pokemonIds) =>
        from(pokemonIds).pipe(
          concatMap((pokemonId) => this.#pokemonsApi.getOne(pokemonId)),
          toArray(),
        ),
      ),
    ),
    { initialValue: [] },
  );

  // TO REMOVE AFTER TESTS
  protected updateTeam() {
    this.#teamsApi
      .setTrainerTeam({
        trainerId: this.trainer().id,
        pokemons: this.pokemons().map((pokemon) => pokemon.pokedex_id + 1),
      })
      .subscribe();
  }
}
