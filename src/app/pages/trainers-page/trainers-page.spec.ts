import { ComponentFixture, TestBed } from '@angular/core/testing';
import TrainersPage from './trainers-page';

describe('TrainersPage', () => {
  let component: TrainersPage;
  let fixture: ComponentFixture<TrainersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainersPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainersPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
