import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEsignatureComponentComponent } from './form-esignature-component.component';

describe('FormEsignatureComponentComponent', () => {
  let component: FormEsignatureComponentComponent;
  let fixture: ComponentFixture<FormEsignatureComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEsignatureComponentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEsignatureComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
