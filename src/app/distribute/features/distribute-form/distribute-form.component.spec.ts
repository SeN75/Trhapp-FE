import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeFormComponent } from './distribute-form.component';

describe('DistributeFormComponent', () => {
  let component: DistributeFormComponent;
  let fixture: ComponentFixture<DistributeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistributeFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DistributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
