import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimProfileComponent } from './pilgrim-profile.component';

describe('PilgrimProfileComponent', () => {
  let component: PilgrimProfileComponent;
  let fixture: ComponentFixture<PilgrimProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
