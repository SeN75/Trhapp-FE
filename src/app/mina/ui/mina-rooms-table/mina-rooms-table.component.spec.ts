import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaRoomsTableComponent } from './mina-rooms-table.component';

describe('MinaRoomsTableComponent', () => {
  let component: MinaRoomsTableComponent;
  let fixture: ComponentFixture<MinaRoomsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaRoomsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaRoomsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
