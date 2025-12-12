import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TeamDTO } from './team.dto';
import { TrainerDTO } from './trainer.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TeamsApi {
  readonly #http = inject(HttpClient);

  getTrainerTeam(trainer: TrainerDTO): Observable<TeamDTO> {
    return this.#http.get<TeamDTO>(`${environment.apiUrl}/trainers/${trainer.id}/team`);
  }

  setTrainerTeam(team: TeamDTO): Observable<TeamDTO> {
    return this.#http.put<TeamDTO>(`${environment.apiUrl}/trainers/${team.trainerId}/team`, team);
  }
}
