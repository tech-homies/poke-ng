import { inject, Injectable, Signal } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TeamDTO } from './team.dto';
import { TrainerDTO } from './trainer.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsApi {
  readonly #http = inject(HttpClient);

  getTrainerTeamResource(
    trainer: Signal<TrainerDTO | undefined>,
  ): HttpResourceRef<TeamDTO | undefined> {
    return httpResource<TeamDTO>(() => {
      const currentTrainer = trainer();
      if (!currentTrainer) {
        return undefined;
      }
      return `${environment.apiUrl}/trainers/${currentTrainer.id}/team`;
    });
  }

  getTrainerTeam(trainer: TrainerDTO): Observable<TeamDTO> {
    return this.#http.get<TeamDTO>(`${environment.apiUrl}/trainers/${trainer.id}/team`);
  }
}
