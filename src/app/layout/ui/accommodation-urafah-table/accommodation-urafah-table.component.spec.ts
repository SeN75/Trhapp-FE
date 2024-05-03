import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUrafahTableComponent } from './accommodation-urafah-table.component';

describe('AccommodationUrafahTableComponent', () => {
  let component: AccommodationUrafahTableComponent;
  let fixture: ComponentFixture<AccommodationUrafahTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationUrafahTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationUrafahTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
