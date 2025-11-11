import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: 'pokedex', loadComponent: () => import('./pages/pokedex-page/pokedex-page')},
  {path: 'pokemon', loadComponent: () => import('./pages/pokemon-page/pokemon-page')},
  {path: '**', redirectTo: 'pokemon', pathMatch: 'full'},
];
