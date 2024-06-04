import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDataBarComponent } from './dashboard-data-bar.component';

describe('DashboardDataBarComponent', () => {
  let component: DashboardDataBarComponent;
  let fixture: ComponentFixture<DashboardDataBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDataBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDataBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
