import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaRoomsBedsComponent } from './mina-rooms-beds.component';

describe('MinaRoomsBedsComponent', () => {
  let component: MinaRoomsBedsComponent;
  let fixture: ComponentFixture<MinaRoomsBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaRoomsBedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaRoomsBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
