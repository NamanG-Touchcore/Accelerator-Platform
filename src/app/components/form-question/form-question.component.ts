import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
export class FormQuestionComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() formInput: FormInput;

  ngOnInit(): void {
  }

  getFormInputModel(question, form, parentQuestion = null): FormInput {
    return this.formService.getFormInputModel(question, form, parentQuestion)
  }



}
