import { Component, inject, input, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
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
import { TrainerDTO } from '../../../services/api/trainer.dto';
import { UserStore } from '../../../services/store/user.store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-card',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardAvatar,
    MatCardContent,
    MatCardHeader,
    MatCardImage,
    MatCardSubtitle,
    MatCardTitle,
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
})
export class UserCard {
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  user = input.required<TrainerDTO>();

  selectTrainer() {
    this.userStore.setUser(this.user());
    this.router.navigate(['/app/trainers']);
  }
}
