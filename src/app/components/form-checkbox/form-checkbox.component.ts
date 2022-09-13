import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-form-checkbox',
  templateUrl: './form-checkbox.component.html',
  styleUrls: ['./form-checkbox.component.scss']
})
export class FormCheckboxComponent implements OnInit, OnChanges {

  constructor(private formService: FormService, private formStepNavigatorService: FormStepNavigator) { }
  @Input() formInput: FormInput
  questionId: string = null
  disabled: boolean = false

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    // Here we will consider the parent question, only when the step is form and the answertype is multiple. Because when answer type is multiple, the form item id is not unique
    this.questionId = this.formInput.parentQuestion && !this.formInput.question.dictionary ? `${this.formInput.parentQuestion.identifier}.${this.formInput.question.identifier}@${logLineRepeatKey}` : `${this.formInput.question.identifier}@${logLineRepeatKey}`
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }


  onCheckboxChanged(event: any, data: any): void {
    const formControlsArray = this.formInput.form.get([this.questionId]) as FormArray
    if (event.target.checked) {
      formControlsArray.push(new FormControl(event.target.value))
    } else {
      let index = 0
      for (let control of formControlsArray.controls) {
        if (control.value === event.target.value) {
          formControlsArray.removeAt(index)
        }
        index++
      }
    }
    let itemOID = this.formInput.question.dictionary ? this.questionId : data.value
    let value = event.target.checked ? "yes" : "no"
    this.formStepNavigatorService.saveIndividualResponse(itemOID, value, this.formInput.question, this.formInput.parentQuestion)
  }

  isChecked(value: string): boolean {
    return this.formInput.form.value[this.questionId].includes(value)
  }

  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text)
  }

}
