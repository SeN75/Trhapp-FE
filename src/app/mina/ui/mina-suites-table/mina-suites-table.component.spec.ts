import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaSuitesTableComponent } from './mina-suites-table.component';

describe('MinaSuitesTableComponent', () => {
  let component: MinaSuitesTableComponent;
  let fixture: ComponentFixture<MinaSuitesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaSuitesTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaSuitesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
