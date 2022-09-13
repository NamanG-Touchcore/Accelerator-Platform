import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
declare const pieTimer: any;
@Component({
  selector: 'app-form-progress-bar',
  templateUrl: './form-progress-bar.component.html',
  styleUrls: ['./form-progress-bar.component.scss']
})
export class FormProgressBarComponent implements OnChanges {

  constructor() {

  }
  @Input() percentage: number;
  @Input() sectionId: string;

  ngOnChanges(changes: SimpleChanges): void {
    pieTimer(this.percentage, this.sectionId)
  }

}
