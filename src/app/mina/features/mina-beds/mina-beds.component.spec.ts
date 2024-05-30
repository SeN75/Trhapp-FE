import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaBedsComponent } from './mina-beds.component';

describe('MinaBedsComponent', () => {
  let component: MinaBedsComponent;
  let fixture: ComponentFixture<MinaBedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaBedsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaBedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
