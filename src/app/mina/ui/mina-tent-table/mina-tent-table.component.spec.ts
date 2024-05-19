import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaTentTableComponent } from './mina-tent-table.component';

describe('MinaTentTableComponent', () => {
  let component: MinaTentTableComponent;
  let fixture: ComponentFixture<MinaTentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaTentTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaTentTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
