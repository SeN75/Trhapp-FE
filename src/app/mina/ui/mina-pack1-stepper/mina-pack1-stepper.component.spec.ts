import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaPack1StepperComponent } from './mina-pack1-stepper.component';

describe('MinaPack1StepperComponent', () => {
  let component: MinaPack1StepperComponent;
  let fixture: ComponentFixture<MinaPack1StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaPack1StepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaPack1StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
