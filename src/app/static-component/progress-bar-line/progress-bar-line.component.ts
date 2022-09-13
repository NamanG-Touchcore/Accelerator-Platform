import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
declare const roundNumber: any;

@Component({
  selector: 'app-progress-bar-line',
  templateUrl: './progress-bar-line.component.html',
  styleUrls: ['./progress-bar-line.component.scss']
})
export class ProgressBarLineComponent implements OnInit, OnChanges {

  constructor(private formStepNavigatorService: FormStepNavigator) { }
  @Input() percentage: number = 0;
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
