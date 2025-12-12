import { Injectable, signal } from '@angular/core';
import { TrainerDTO } from '../api/trainer.dto';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  readonly user = signal<TrainerDTO | null>(null);

  setUser(user: TrainerDTO): void {
    this.user.set(user);
  }

  isLogged(): boolean {
    return this.user() !== null;
  }

  logout(): void {
    this.user.set(null);
  }
}
