import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { Utility } from 'src/app/utility/utility';
@Component({
  selector: 'app-form-radio',
  templateUrl: './form-radio.component.html',
  styleUrls: ['./form-radio.component.scss']
})
export class FormRadioComponent implements OnInit, OnChanges {

  constructor(private formService: FormService, private formStepNavigatorService: FormStepNavigator) { }
  @Input() formInput: FormInput;
  questionId: string = null
  disabled: boolean = false
  ngOnInit(): void {
  }
getString(obj): string {
    return JSON.stringify(obj)
  }
  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    this.disabled = this.formService.isSurveyReadOnlyMode()
    if (Utility.isRepeatQuestion(this.formInput.question)) {
      this.questionId = this.formInput.parentQuestion ? `${this.formInput.parentQuestion.identifier}.${this.questionId}` : this.questionId
    }
  }

  onChange() {
    console.log('on change')
    console.log(this.formInput)
    this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.formInput.form.value[this.questionId], this.formInput.question, this.formInput.parentQuestion)
  }

  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text) && !this.isOptionalQuestion()
  }



}
