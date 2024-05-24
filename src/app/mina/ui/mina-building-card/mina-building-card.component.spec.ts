import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaBuildingCardComponent } from './mina-building-card.component';

describe('MinaBuildingCardComponent', () => {
  let component: MinaBuildingCardComponent;
  let fixture: ComponentFixture<MinaBuildingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaBuildingCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaBuildingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
