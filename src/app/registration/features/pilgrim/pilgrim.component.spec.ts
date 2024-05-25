import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimComponent } from './pilgrim.component';

describe('PilgrimComponent', () => {
  let component: PilgrimComponent;
  let fixture: ComponentFixture<PilgrimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
