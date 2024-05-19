import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaBuildingComponent } from './mina-building.component';

describe('MinaBuildingComponent', () => {
  let component: MinaBuildingComponent;
  let fixture: ComponentFixture<MinaBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
