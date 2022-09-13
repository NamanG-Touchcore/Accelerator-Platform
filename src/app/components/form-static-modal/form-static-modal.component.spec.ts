import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormStaticModalComponent } from './form-static-modal.component';

describe('FormStaticModalComponent', () => {
  let component: FormStaticModalComponent;
  let fixture: ComponentFixture<FormStaticModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormStaticModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormStaticModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
