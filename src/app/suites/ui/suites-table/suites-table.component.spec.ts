import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuitesTableComponent } from './suites-table.component';

describe('SuitesTableComponent', () => {
  let component: SuitesTableComponent;
  let fixture: ComponentFixture<SuitesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuitesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
