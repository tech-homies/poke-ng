import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
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
import { NgOptimizedImage } from '@angular/common';

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
    NgOptimizedImage,
  ],
  templateUrl: './user-card.html',
  styleUrl: './user-card.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCard {
  private readonly userStore = inject(UserStore);
  private readonly router = inject(Router);

  readonly user = input.required<TrainerDTO>();

  selectTrainer(): void {
    this.userStore.setUser(this.user());
    this.router.navigate(['/app/trainers']);
  }
}
