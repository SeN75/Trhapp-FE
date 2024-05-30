import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaAllocationStatusComponent } from './mina-allocation-status.component';

describe('MinaAllocationStatusComponent', () => {
  let component: MinaAllocationStatusComponent;
  let fixture: ComponentFixture<MinaAllocationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaAllocationStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaAllocationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
