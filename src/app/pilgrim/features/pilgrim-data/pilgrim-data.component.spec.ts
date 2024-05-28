import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimDataComponent } from './pilgrim-data.component';

describe('PilgrimDataComponent', () => {
  let component: PilgrimDataComponent;
  let fixture: ComponentFixture<PilgrimDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
