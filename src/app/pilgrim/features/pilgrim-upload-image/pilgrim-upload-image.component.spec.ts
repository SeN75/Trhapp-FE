import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilgrimUploadImageComponent } from './pilgrim-upload-image.component';

describe('PilgrimUploadImageComponent', () => {
  let component: PilgrimUploadImageComponent;
  let fixture: ComponentFixture<PilgrimUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilgrimUploadImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PilgrimUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
