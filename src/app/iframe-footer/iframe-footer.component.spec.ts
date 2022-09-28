import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IframeFooterComponent } from './iframe-footer.component';

describe('IframeFooterComponent', () => {
  let component: IframeFooterComponent;
  let fixture: ComponentFixture<IframeFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IframeFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IframeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
