import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaCreatePlaceComponent } from './mina-create-place.component';

describe('MinaCreatePlaceComponent', () => {
  let component: MinaCreatePlaceComponent;
  let fixture: ComponentFixture<MinaCreatePlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaCreatePlaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaCreatePlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
