import { ComponentFixture, TestBed } from '@angular/core/testing';
import SelectUserPage from './select-user-page';

describe('SelectUserPage', () => {
  let component: SelectUserPage;
  let fixture: ComponentFixture<SelectUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectUserPage],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectUserPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
