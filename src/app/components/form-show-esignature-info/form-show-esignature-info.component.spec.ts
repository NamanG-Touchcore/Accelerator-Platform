import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormShowEsignatureInfoComponent } from './form-show-esignature-info.component';

describe('FormShowEsignatureInfoComponent', () => {
  let component: FormShowEsignatureInfoComponent;
  let fixture: ComponentFixture<FormShowEsignatureInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormShowEsignatureInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormShowEsignatureInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
