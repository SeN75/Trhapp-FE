import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaViewSuitesComponent } from './mina-view-suites.component';

describe('MinaViewSuitesComponent', () => {
  let component: MinaViewSuitesComponent;
  let fixture: ComponentFixture<MinaViewSuitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaViewSuitesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaViewSuitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
