import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUserPage } from './select-user-page';

describe('SelectTrainer', () => {
  let component: SelectTrainer;
  let fixture: ComponentFixture<SelectTrainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectTrainer],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectTrainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
