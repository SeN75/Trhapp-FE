import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaCreateBuildingComponent } from './mina-create-building.component';

describe('MinaCreateBuildingComponent', () => {
  let component: MinaCreateBuildingComponent;
  let fixture: ComponentFixture<MinaCreateBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaCreateBuildingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaCreateBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
