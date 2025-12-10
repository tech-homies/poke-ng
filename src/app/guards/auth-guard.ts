import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../services/store/user.store';

export const authGuard = () => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  return userStore.isLogged() || router.navigate(['']);
};
