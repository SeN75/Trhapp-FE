import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaPack4StepperComponent } from './mina-pack4-stepper.component';

describe('MinaPack4StepperComponent', () => {
  let component: MinaPack4StepperComponent;
  let fixture: ComponentFixture<MinaPack4StepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaPack4StepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaPack4StepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
