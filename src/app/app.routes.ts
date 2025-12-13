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
      {
        path: 'trainers/:id',
        loadComponent: () => import('./pages/trainer-details-page/trainer-details-page'),
      },
      {
        path: 'trainers/:id/battles',
        loadComponent: () => import('./pages/trainer-battles-page/trainer-battles-page'),
      },
      {
        path: 'pokemons',
        loadComponent: () => import('./pages/pokemons-page/pokemons-page'),
      },
      {
        path: 'ranking',
        loadComponent: () => import('./pages/ranking-page/ranking-page'),
      },
    ],
  },
  { path: '', redirectTo: '/select-trainer', pathMatch: 'full' },
  { path: '**', redirectTo: '/app/trainers' },
];
