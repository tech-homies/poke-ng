import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers.api';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TrainerCard } from './trainer-card/trainer-card';

@Component({
  selector: 'app-trainers-page',
  imports: [MatProgressSpinner, TrainerCard],
  templateUrl: './trainers-page.html',
  styleUrl: './trainers-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrainersPage {
  readonly #trainersApi = inject(TrainersApi);

  readonly trainers = this.#trainersApi.getAllResource();
}
