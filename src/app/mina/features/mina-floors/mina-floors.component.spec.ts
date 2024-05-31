import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaFloorsComponent } from './mina-floors.component';

describe('MinaFloorsComponent', () => {
  let component: MinaFloorsComponent;
  let fixture: ComponentFixture<MinaFloorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaFloorsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaFloorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
