import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRendererContainerComponent } from './form-renderer-container.component';

describe('FormRendererContainerComponent', () => {
  let component: FormRendererContainerComponent;
  let fixture: ComponentFixture<FormRendererContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormRendererContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRendererContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
