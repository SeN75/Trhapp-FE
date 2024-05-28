import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimsDataTableComponent } from './pilgrims-data-table.component';

describe('PilgrimsDataTableComponent', () => {
  let component: PilgrimsDataTableComponent;
  let fixture: ComponentFixture<PilgrimsDataTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimsDataTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimsDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
