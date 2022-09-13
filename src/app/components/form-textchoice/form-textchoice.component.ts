import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';

@Component({
  selector: 'app-form-textchoice',
  templateUrl: './form-textchoice.component.html',
  styleUrls: ['./form-textchoice.component.scss']
})
export class FormTextchoiceComponent {

  @Input() formInput: FormInput

  constructor() { }

  ngOnInit(): void {

  }

  



}
