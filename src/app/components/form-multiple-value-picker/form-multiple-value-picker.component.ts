import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-multiple-value-picker',
  templateUrl: './form-multiple-value-picker.component.html',
  styleUrls: ['./form-multiple-value-picker.component.scss']
})
export class FormMultipleValuePickerComponent implements OnInit {

  constructor(private formService: FormService) { }

  @Input() formInput: FormInput

  ngOnInit(): void {
  }

  getFormInputModel(question, form, parentQuestion = null): FormInput {
    return this.formService.getFormInputModel(question, form, parentQuestion)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text) && !this.formInput.question.isOptional
  }

  
}
