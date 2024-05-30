import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinaBedsTableComponent } from './mina-beds-table.component';

describe('MinaBedsTableComponent', () => {
  let component: MinaBedsTableComponent;
  let fixture: ComponentFixture<MinaBedsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinaBedsTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MinaBedsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
