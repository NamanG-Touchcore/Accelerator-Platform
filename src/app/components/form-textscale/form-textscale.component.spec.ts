import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTextscaleComponent } from './form-textscale.component';

describe('FormTextscaleComponent', () => {
  let component: FormTextscaleComponent;
  let fixture: ComponentFixture<FormTextscaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormTextscaleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormTextscaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
