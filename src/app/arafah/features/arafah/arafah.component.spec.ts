import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahComponent } from './arafah.component';

describe('ArafahComponent', () => {
  let component: ArafahComponent;
  let fixture: ComponentFixture<ArafahComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArafahComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
