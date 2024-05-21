import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArafahCreateSuiteComponent } from './arafah-create-suite.component';

describe('ArafahCreateSuiteComponent', () => {
  let component: ArafahCreateSuiteComponent;
  let fixture: ComponentFixture<ArafahCreateSuiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArafahCreateSuiteComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArafahCreateSuiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
