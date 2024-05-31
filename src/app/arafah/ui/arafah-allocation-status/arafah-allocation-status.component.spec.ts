import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahAllocationStatusComponent } from './arafah-allocation-status.component';

describe('ArafahAllocationStatusComponent', () => {
  let component: ArafahAllocationStatusComponent;
  let fixture: ComponentFixture<ArafahAllocationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahAllocationStatusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafahAllocationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
