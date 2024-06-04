import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDataCardComponent } from './dashboard-data-card.component';

describe('DashboardDataCardComponent', () => {
  let component: DashboardDataCardComponent;
  let fixture: ComponentFixture<DashboardDataCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDataCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDataCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
