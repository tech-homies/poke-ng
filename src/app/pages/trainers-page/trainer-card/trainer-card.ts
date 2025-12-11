import { Component, inject, input, OnInit, signal, Signal } from '@angular/core';
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
import { concatAll, concatMap, toArray } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatIcon } from '@angular/material/icon';

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
export class TrainerCard implements OnInit {
  readonly trainer = input.required<TrainerDTO>();
  readonly teamsApi = inject(TeamsApi);
  readonly pokemonsApi = inject(PokemonsApi);
  pokemons = signal<PokemonDTO[]>([]);

  ngOnInit(): void {
    this.#loadTeam();
  }

  #loadTeam() {
    this.teamsApi
      .getTrainerTeam(this.trainer())
      .pipe(
        map((team) => team.pokemons),
        concatAll(),
        concatMap((pokemonId) => this.pokemonsApi.getOne(pokemonId)),
        toArray(),
      )
      .subscribe((pokemons) => {
        this.pokemons.set(pokemons);
      });
  }

  protected updateTeam() {
    this.teamsApi
      .setTrainerTeam({
        trainerId: this.trainer().id,
        pokemons: this.pokemons().map((pokemon) => pokemon.pokedex_id + 1),
      })
      .subscribe();
  }
}
