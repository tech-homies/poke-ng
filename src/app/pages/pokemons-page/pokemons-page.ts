import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemons-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.scss',
})
export default class PokemonsPage {}
