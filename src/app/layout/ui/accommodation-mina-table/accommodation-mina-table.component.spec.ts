import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationMinaTableComponent } from './accommodation-mina-table.component';

describe('AccommodationMinaTableComponent', () => {
  let component: AccommodationMinaTableComponent;
  let fixture: ComponentFixture<AccommodationMinaTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationMinaTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationMinaTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
