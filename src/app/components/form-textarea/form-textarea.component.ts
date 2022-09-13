import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrls: ['./form-textarea.component.scss']
})
export class FormTextareaComponent implements OnInit, OnChanges {

  displayModalStyle: string = "none"

  constructor(public formStepNavigatorService: FormStepNavigator, private formService: FormService) { }

  @Input() formInput: FormInput
  questionId: string = null
  disabled: boolean = false

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }

  onBlur(): void {
    let isValid = this.formInput.form.controls[this.questionId].valid
    if (!isValid && this.formInput.question.answerFormat.invalidMessage) {
      this.displayModalStyle = "block"
    }
    if (isValid) {
      this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.formInput.form.value[this.questionId], this.formInput.question, this.formInput.parentQuestion)
    }
    this.formStepNavigatorService.setResponseValidity(this.formInput.question.identifier, isValid)
  }

  onModalClose(): void {
    this.displayModalStyle = "none"
  }

  getInvalidMessage(): string {
    return this.formInput.question.answerFormat.invalidMessage
  }

  getPlaceholderText(): string {
    let text = this.formInput.question.placeholder ? this.formInput.question.placeholder : ""
    return text;
  }

  capitalizeWords(): boolean {
    return this.formInput.question.answerFormat.autocapitalizationType && this.formInput.question.answerFormat.autocapitalizationType === "words"
  }

  capitalizeCharachters(): boolean {
    return this.formInput.question.answerFormat.autocapitalizationType && this.formInput.question.answerFormat.autocapitalizationType === "allCharacters"
  }


  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text) && !this.formInput.question.isOptional
  }



}
