import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimAssemblyPointComponent } from './pilgrim-assembly-point.component';

describe('PilgrimAssemblyPointComponent', () => {
  let component: PilgrimAssemblyPointComponent;
  let fixture: ComponentFixture<PilgrimAssemblyPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimAssemblyPointComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimAssemblyPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
