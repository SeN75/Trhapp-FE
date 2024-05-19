import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaCreateSuiteComponent } from './mina-create-suite.component';

describe('MinaCreateSuiteComponent', () => {
  let component: MinaCreateSuiteComponent;
  let fixture: ComponentFixture<MinaCreateSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaCreateSuiteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaCreateSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
