import { Component, inject, signal } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers.api';
import { TrainerDTO } from '../../services/api/trainer.dto';
import { User } from './user/user';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-select-user-page',
  imports: [User, MatButton],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
})
export default class SelectUserPage {
  private readonly trainersApi = inject(TrainersApi);

  users = signal<TrainerDTO[]>([]);

  constructor() {
    this.loadTrainers();
  }

  private loadTrainers(): void {
    this.trainersApi.getAll().subscribe((trainers) => {
      this.users.set(trainers);
    });
  }
}
