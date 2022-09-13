import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';

@Component({
  selector: 'app-form-line-progress-bar-with-no-percent',
  templateUrl: './form-line-progress-bar-with-no-percent.component.html',
  styleUrls: ['./form-line-progress-bar-with-no-percent.component.scss']
})
export class FormLineProgressBarWithNoPercentComponent implements OnInit, OnChanges {

  constructor(private formStepNavigatorService: FormStepNavigator) { }
  @Input() percentage: number = 0;

  ngOnInit(): void {
    this.formStepNavigatorService.progressSubject.subscribe(percentage => {
      this.percentage = percentage
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
