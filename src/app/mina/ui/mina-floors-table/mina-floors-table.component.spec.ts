import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaFloorsTableComponent } from './mina-floors-table.component';

describe('MinaFloorsTableComponent', () => {
  let component: MinaFloorsTableComponent;
  let fixture: ComponentFixture<MinaFloorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaFloorsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaFloorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
