import { Component, DestroyRef, inject } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers.api';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialog } from './add-user-dialog/add-user-dialog';
import { TrainerDTO } from '../../services/api/trainer.dto';
import { filter } from 'rxjs';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-card-page',
  imports: [UserCard, MatButton, MatProgressSpinner, UserCard],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
})
export default class SelectUserPage {
  readonly #trainersApi = inject(TrainersApi);
  readonly #dialog = inject(MatDialog);
  readonly #destroyRef = inject(DestroyRef);

  readonly users = this.#trainersApi.getAllResource();

  addUser(): void {
    this.#dialog
      .open<AddUserDialog, undefined, TrainerDTO>(AddUserDialog)
      .afterClosed()
      .pipe(filter(Boolean), takeUntilDestroyed(this.#destroyRef))
      .subscribe((user) => {
        this.users.update((users) => users.concat(user));
      });
  }
}
