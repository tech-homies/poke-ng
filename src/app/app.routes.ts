import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: 'select-trainer',
    loadComponent: () => import('./pages/select-user-page/select-user-page'),
  },
  {
    path: 'app',
    loadComponent: () => import('./layout/layout'),
    canActivate: [authGuard],
    children: [
      {
        path: 'trainers',
        loadComponent: () => import('./pages/trainers-page/trainers-page'),
      },
    ],
  },
  { path: '', redirectTo: '/select-trainer', pathMatch: 'full' },
  { path: '**', redirectTo: '/app/trainers' },
];
