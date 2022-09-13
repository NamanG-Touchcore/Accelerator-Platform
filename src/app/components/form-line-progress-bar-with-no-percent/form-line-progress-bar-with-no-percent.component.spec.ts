import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLineProgressBarWithNoPercentComponent } from './form-line-progress-bar-with-no-percent.component';

describe('FormLineProgressBarWithNoPercentComponent', () => {
  let component: FormLineProgressBarWithNoPercentComponent;
  let fixture: ComponentFixture<FormLineProgressBarWithNoPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLineProgressBarWithNoPercentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLineProgressBarWithNoPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
