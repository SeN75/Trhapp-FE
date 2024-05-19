import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaTentComponent } from './mina-tent.component';

describe('MinaTentComponent', () => {
  let component: MinaTentComponent;
  let fixture: ComponentFixture<MinaTentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaTentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaTentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
