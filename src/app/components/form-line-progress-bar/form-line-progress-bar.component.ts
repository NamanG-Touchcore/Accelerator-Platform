import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
declare const roundNumber: any;

@Component({
  selector: 'app-form-line-progress-bar',
  templateUrl: './form-line-progress-bar.component.html',
  styleUrls: ['./form-line-progress-bar.component.scss']
})
export class FormLineProgressBarComponent implements OnInit, OnChanges {

  constructor(private formStepNavigatorService: FormStepNavigator) { }
  percentage: number = 0;
  Roundedpercentage: number = 0;

  ngOnInit(): void {
    this.formStepNavigatorService.progressSubject.subscribe(percentage => {
      this.percentage = percentage
      this.Roundedpercentage = roundNumber(this.percentage)
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.Roundedpercentage = roundNumber(this.percentage)
  }

}
