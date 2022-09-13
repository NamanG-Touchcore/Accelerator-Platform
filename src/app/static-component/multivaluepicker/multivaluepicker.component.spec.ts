import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultivaluepickerComponent } from './multivaluepicker.component';

describe('MultivaluepickerComponent', () => {
  let component: MultivaluepickerComponent;
  let fixture: ComponentFixture<MultivaluepickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultivaluepickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MultivaluepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
