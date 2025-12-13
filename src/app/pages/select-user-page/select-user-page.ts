import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TrainersApi } from '../../services/api/trainers.api';
import { MatButton } from '@angular/material/button';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialog } from './add-user-dialog/add-user-dialog';
import { TrainerDTO } from '../../services/api/trainer.dto';
import { filter, switchMap, tap } from 'rxjs';
import { UserCard } from './user-card/user-card';

@Component({
  selector: 'app-select-user-page',
  imports: [UserCard, MatButton, MatProgressSpinner],
  templateUrl: './select-user-page.html',
  styleUrl: './select-user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      .pipe(
        filter(Boolean),
        switchMap((user) => this.#trainersApi.create(user)),
        tap((user) => this.users.update((users) => users.concat(user))),
        takeUntilDestroyed(this.#destroyRef),
      )
      .subscribe();
  }
}
