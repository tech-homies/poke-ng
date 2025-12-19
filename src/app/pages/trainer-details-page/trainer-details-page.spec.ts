import { ComponentFixture, TestBed } from '@angular/core/testing';
import TrainerDetailsPage from './trainer-details-page';

describe('TrainerDetailsPage', () => {
  let component: TrainerDetailsPage;
  let fixture: ComponentFixture<TrainerDetailsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainerDetailsPage],
    }).compileComponents();

    fixture = TestBed.createComponent(TrainerDetailsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
