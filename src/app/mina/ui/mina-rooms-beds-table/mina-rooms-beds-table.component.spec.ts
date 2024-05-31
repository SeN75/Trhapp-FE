import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaRoomsBedsTableComponent } from './mina-rooms-beds-table.component';

describe('MinaRoomsBedsTableComponent', () => {
  let component: MinaRoomsBedsTableComponent;
  let fixture: ComponentFixture<MinaRoomsBedsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaRoomsBedsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaRoomsBedsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
