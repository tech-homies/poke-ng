import { Injectable, Signal } from '@angular/core';
import { httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TeamDTO } from './team.dto';
import { TrainerDTO } from './trainer.dto';

@Injectable({
  providedIn: 'root',
})
export class TeamsApi {
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
}
