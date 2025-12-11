import { Component, computed, inject, input, Signal } from '@angular/core';
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
import { JsonPipe } from '@angular/common';
import { HttpResourceRef } from '@angular/common/http';
import { PokemonDTO } from '../../../services/api/pokemonDTO';
import { PokemonsApi } from '../../../services/api/pokemons.api';

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
    JsonPipe,
  ],
  templateUrl: './trainer-card.html',
  styleUrl: './trainer-card.scss',
})
export class TrainerCard {
  readonly trainer = input<TrainerDTO>();
  readonly teamsApi = inject(TeamsApi);
  readonly pokemonsApi = inject(PokemonsApi);
  readonly teamResource = this.teamsApi.getTrainerTeamResource(this.trainer);
  readonly pokemonResources: Signal<HttpResourceRef<PokemonDTO | undefined>[]> = computed(() => {
    debugger;
    const team = this.teamResource.value();
    if (!team) {
      return [];
    }
    debugger;
    return team.pokemons.map((pokemonId) => {
      return this.pokemonsApi.getOneResource(pokemonId);
    });
  });
}
