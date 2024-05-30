import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimAllocationComponent } from './pilgrim-allocation.component';

describe('PilgrimAllocationComponent', () => {
  let component: PilgrimAllocationComponent;
  let fixture: ComponentFixture<PilgrimAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimAllocationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
