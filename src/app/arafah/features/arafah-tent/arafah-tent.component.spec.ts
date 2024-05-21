import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahTentComponent } from './arafah-tent.component';

describe('ArafahTentComponent', () => {
  let component: ArafahTentComponent;
  let fixture: ComponentFixture<ArafahTentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahTentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArafahTentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
