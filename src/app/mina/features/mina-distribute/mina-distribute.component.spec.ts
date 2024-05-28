import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaDistributeComponent } from './mina-distribute.component';

describe('MinaDistributeComponent', () => {
  let component: MinaDistributeComponent;
  let fixture: ComponentFixture<MinaDistributeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaDistributeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaDistributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
