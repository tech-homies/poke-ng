import { inject, Injectable } from '@angular/core';
import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { TrainerDTO } from './trainer.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TrainersApi {
  private readonly http = inject(HttpClient);

  getAll(): Observable<TrainerDTO[]> {
    return this.http.get<TrainerDTO[]>(`${environment.apiUrl}/trainers`);
  }

  getAllResource(): HttpResourceRef<TrainerDTO[]> {
    return httpResource<TrainerDTO[]>(() => `${environment.apiUrl}/trainers`, {
      defaultValue: [],
    });
  }

  create(trainer: Omit<TrainerDTO, 'id'>): Observable<TrainerDTO> {
    return this.http.post<TrainerDTO>(`${environment.apiUrl}/trainers`, trainer);
  }
}
