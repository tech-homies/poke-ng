import { TestBed } from '@angular/core/testing';

import { TrainersApi } from './trainers.api';

describe('TrainersApi', () => {
  let service: TrainersApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrainersApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
