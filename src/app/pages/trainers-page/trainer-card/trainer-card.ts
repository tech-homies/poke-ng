import { Component, inject, input } from '@angular/core';
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
  readonly teamResource = this.teamsApi.getTrainerTeamResource(this.trainer);
}
