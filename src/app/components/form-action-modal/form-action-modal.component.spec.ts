import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormActionModal } from './form-action-modal.component';

describe('FormActionModal', () => {
  let component: FormActionModal;
  let fixture: ComponentFixture<FormActionModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormActionModal ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormActionModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
