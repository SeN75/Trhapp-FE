import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaRoomsComponent } from './mina-rooms.component';

describe('MinaRoomsComponent', () => {
  let component: MinaRoomsComponent;
  let fixture: ComponentFixture<MinaRoomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaRoomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaRoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
