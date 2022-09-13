import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLineProgressBarComponent } from './form-line-progress-bar.component';

describe('ProgressBarLineComponent', () => {
  let component: FormLineProgressBarComponent;
  let fixture: ComponentFixture<FormLineProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormLineProgressBarComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLineProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
