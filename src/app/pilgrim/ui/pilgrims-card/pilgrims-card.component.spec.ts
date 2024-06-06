import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimsCardComponent } from './pilgrims-card.component';

describe('PilgrimsCardComponent', () => {
  let component: PilgrimsCardComponent;
  let fixture: ComponentFixture<PilgrimsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
