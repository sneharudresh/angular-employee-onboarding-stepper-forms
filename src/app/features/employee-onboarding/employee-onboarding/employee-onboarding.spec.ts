import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOnboarding } from './employee-onboarding';

describe('EmployeeOnboarding', () => {
  let component: EmployeeOnboarding;
  let fixture: ComponentFixture<EmployeeOnboarding>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeOnboarding]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeeOnboarding);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
