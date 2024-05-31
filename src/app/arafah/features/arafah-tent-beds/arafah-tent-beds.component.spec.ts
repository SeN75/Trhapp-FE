import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahTentBedsComponent } from './arafah-tent-beds.component';

describe('ArafahTentBedsComponent', () => {
  let component: ArafahTentBedsComponent;
  let fixture: ComponentFixture<ArafahTentBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahTentBedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafahTentBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
