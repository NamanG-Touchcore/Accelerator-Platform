import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSelectionVerticalComponent } from './image-selection-vertical.component';

describe('ImageSelectionVerticalComponent', () => {
  let component: ImageSelectionVerticalComponent;
  let fixture: ComponentFixture<ImageSelectionVerticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageSelectionVerticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectionVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
