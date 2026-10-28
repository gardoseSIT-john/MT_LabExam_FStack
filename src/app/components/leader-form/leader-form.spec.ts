import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LeaderFormComponent } from './leader-form';

describe('LeaderForm', () => {
  let component: LeaderFormComponent;
  let fixture: ComponentFixture<LeaderFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaderFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
