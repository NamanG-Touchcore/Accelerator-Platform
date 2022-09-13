import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectProfileComponent } from './subject-profile.component';

describe('SubjectProfileComponent', () => {
  let component: SubjectProfileComponent;
  let fixture: ComponentFixture<SubjectProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
