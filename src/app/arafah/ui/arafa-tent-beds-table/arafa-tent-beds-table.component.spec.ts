import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafaTentBedsTableComponent } from './arafa-tent-beds-table.component';

describe('ArafaTentBedsTableComponent', () => {
  let component: ArafaTentBedsTableComponent;
  let fixture: ComponentFixture<ArafaTentBedsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafaTentBedsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafaTentBedsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
