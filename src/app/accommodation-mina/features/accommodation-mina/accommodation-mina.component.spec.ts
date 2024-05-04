import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationMinaComponent } from './accommodation-mina.component';

describe('AccommodationMinaComponent', () => {
  let component: AccommodationMinaComponent;
  let fixture: ComponentFixture<AccommodationMinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationMinaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationMinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
