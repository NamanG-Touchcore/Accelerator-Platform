import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormMultipleValuePickerComponent } from './form-multiple-value-picker.component';

describe('FormMultipleValuePickerComponent', () => {
  let component: FormMultipleValuePickerComponent;
  let fixture: ComponentFixture<FormMultipleValuePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormMultipleValuePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormMultipleValuePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
