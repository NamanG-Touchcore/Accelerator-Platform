import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Utility } from 'src/app/utility/utility';


@Component({
  selector: 'app-form-completion',
  templateUrl: './form-completion.component.html',
  styleUrls: ['./form-completion.component.scss']
})
export class FormCompletionComponent implements OnInit, OnChanges {

  @Input() question: any;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(): void {
    this.question.text = this.question.text ? this.question.text.replace(/(?:\r\n|\r|\n)/g, '<br>') : this.question.text;
  }

}
