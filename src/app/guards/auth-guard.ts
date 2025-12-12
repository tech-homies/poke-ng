import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserStore } from '../services/store/user.store';

export const authGuard = (): boolean | Promise<boolean> => {
  const userStore = inject(UserStore);
  const router = inject(Router);

  if (userStore.isLogged()) {
    return true;
  }

  return router.navigate(['']);
};
