import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadOperationsComponent } from './upload-operations.component';

describe('UploadOperationsComponent', () => {
  let component: UploadOperationsComponent;
  let fixture: ComponentFixture<UploadOperationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadOperationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
