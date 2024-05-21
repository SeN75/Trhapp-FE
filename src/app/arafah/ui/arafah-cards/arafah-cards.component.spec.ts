import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahCardsComponent } from './arafah-cards.component';

describe('ArafahCardsComponent', () => {
  let component: ArafahCardsComponent;
  let fixture: ComponentFixture<ArafahCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ArafahCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
