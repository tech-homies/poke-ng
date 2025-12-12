import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-ranking-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './ranking-page.html',
  styleUrl: './ranking-page.scss',
})
export default class RankingPage {}
