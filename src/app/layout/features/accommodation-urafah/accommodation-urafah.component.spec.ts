import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUrafahComponent } from './accommodation-urafah.component';

describe('AccommodationUrafahComponent', () => {
  let component: AccommodationUrafahComponent;
  let fixture: ComponentFixture<AccommodationUrafahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationUrafahComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationUrafahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
