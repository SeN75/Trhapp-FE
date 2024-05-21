import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahTableComponent } from './arafah-table.component';

describe('ArafahTableComponent', () => {
  let component: ArafahTableComponent;
  let fixture: ComponentFixture<ArafahTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArafahTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
