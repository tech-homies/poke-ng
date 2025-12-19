import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-pokemons-page',
  imports: [],
  templateUrl: './pokemons-page.html',
  styleUrl: './pokemons-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PokemonsPage {}
