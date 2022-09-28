import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeHeaderComponent } from './iframe-header.component';

describe('IframeHeaderComponent', () => {
  let component: IframeHeaderComponent;
  let fixture: ComponentFixture<IframeHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
