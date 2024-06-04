import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDataLineComponent } from './dashboard-data-line.component';

describe('DashboardDataLineComponent', () => {
  let component: DashboardDataLineComponent;
  let fixture: ComponentFixture<DashboardDataLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardDataLineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardDataLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
