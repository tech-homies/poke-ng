import { Component, inject, signal } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers.api';
import { TrainerDTO } from '../../services/api/trainer.dto';
import { MatCard, MatCardActions } from '@angular/material/card';
import { Router } from '@angular/router';
import { UserStore } from '../../services/store/user.store';

@Component({
  selector: 'app-select-user-page',
  imports: [MatCard, MatCardActions],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
})
export default class SelectUserPage {
  private readonly trainersApi = inject(TrainersApi);
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  trainers = signal<TrainerDTO[]>([]);

  constructor() {
    this.loadTrainers();
  }

  private loadTrainers(): void {
    this.trainersApi.getAll().subscribe((trainers) => {
      this.trainers.set(trainers);
    });
  }

  selectTrainer(trainer: TrainerDTO) {
    this.userStore.setUser(trainer);
    this.router.navigate(['/app/trainers']);
  }
}
