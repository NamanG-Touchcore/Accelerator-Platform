import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressBarLineComponent } from './progress-bar-line.component';

describe('ProgressBarLineComponent', () => {
  let component: ProgressBarLineComponent;
  let fixture: ComponentFixture<ProgressBarLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressBarLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressBarLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
