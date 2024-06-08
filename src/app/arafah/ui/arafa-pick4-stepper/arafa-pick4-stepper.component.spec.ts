import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafaPick4StepperComponent } from './arafa-pick4-stepper.component';

describe('ArafaPick4StepperComponent', () => {
  let component: ArafaPick4StepperComponent;
  let fixture: ComponentFixture<ArafaPick4StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafaPick4StepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafaPick4StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
