import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainerBattlesPage } from './trainer-battles-page';

describe('TrainerBattlesPage', () => {
  let component: TrainerBattlesPage;
  let fixture: ComponentFixture<TrainerBattlesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerBattlesPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainerBattlesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
