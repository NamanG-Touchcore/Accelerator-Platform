import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormLoaderModalComponent } from './form-loader-modal.component';

describe('FormLoaderModalComponent', () => {
  let component: FormLoaderModalComponent;
  let fixture: ComponentFixture<FormLoaderModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormLoaderModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormLoaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
