import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
import { MatButton } from '@angular/material/button';
import { PokemonsApi } from '../../../services/api/pokemons.api';
import { concatMap, from, of, switchMap, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { UserStore } from '../../../services/store/user.store';
import { RouterLink } from '@angular/router';

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
    NgOptimizedImage,
    MatIcon,
    MatProgressSpinner,
    RouterLink,
  ],
  templateUrl: './trainer-card.html',
  styleUrl: './trainer-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainerCard {
  readonly trainer = input.required<TrainerDTO>();
  readonly #teamsApi = inject(TeamsApi);
  readonly #pokemonsApi = inject(PokemonsApi);
  readonly #userStore = inject(UserStore);

  readonly isCurrentUser = computed(() => {
    const currentUser = this.#userStore.user();
    const trainer = this.trainer();
    return currentUser?.id === trainer.id;
  });

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

  readonly favoritePokemonName = toSignal(
    toObservable(this.trainer).pipe(
      switchMap((trainer) => {
        if (trainer.favoritePokemon) {
          return this.#pokemonsApi.getOne(trainer.favoritePokemon).pipe(map((pokemon) => pokemon.name.fr));
        }
        return of(null);
      }),
    ),
    { initialValue: null },
  );

  readonly isFavoritePokemonLoading = computed(() => {
    const trainer = this.trainer();
    const favoritePokemonName = this.favoritePokemonName();
    return trainer.favoritePokemon && favoritePokemonName === null;
  });
}
