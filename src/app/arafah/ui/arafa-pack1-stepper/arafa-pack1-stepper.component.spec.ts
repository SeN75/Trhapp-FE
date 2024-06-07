import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafaPack1StepperComponent } from './arafa-pack1-stepper.component';

describe('ArafaPack1StepperComponent', () => {
  let component: ArafaPack1StepperComponent;
  let fixture: ComponentFixture<ArafaPack1StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafaPack1StepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafaPack1StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
