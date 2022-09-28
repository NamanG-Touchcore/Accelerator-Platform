import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendererIframeComponent } from './form-renderer-iframe.component';

describe('FormRendererIframeComponent', () => {
  let component: FormRendererIframeComponent;
  let fixture: ComponentFixture<FormRendererIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRendererIframeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRendererIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
