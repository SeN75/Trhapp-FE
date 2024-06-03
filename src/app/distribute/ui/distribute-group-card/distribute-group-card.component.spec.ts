import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeGroupCardComponent } from './distribute-group-card.component';

describe('DistributeGroupCardComponent', () => {
  let component: DistributeGroupCardComponent;
  let fixture: ComponentFixture<DistributeGroupCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributeGroupCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributeGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
