import { DatePipe } from '@angular/common';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { Utility } from 'src/app/utility/utility'

@Component({
  selector: 'app-form-date',
  templateUrl: './form-date.component.html',
  styleUrls: ['./form-date.component.scss']
})
export class FormDateComponent implements OnInit, OnChanges {

  displayModalStyle: string = "none"

  constructor(private formStepNavigatorService: FormStepNavigator, private formService: FormService, private datePipe: DatePipe) { }
  @Input() formInput: FormInput
  questionId: string = null
  maximumDate: string = ""
  minimumDate: string = ""
  disabled: boolean = false
  ngOnInit(): void {
  }


  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    if (this.getMinimumDate()) {
      this.minimumDate = this.getMinimumDate()
    }
    if (this.getMaximumDate()) {
      this.maximumDate = this.getMaximumDate()
    }
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }

  getMinimumDate(): string {
    return this.formInput.question.answerFormat.minimumDate
  }

  getMaximumDate(): string {
    return this.formInput.question.answerFormat.maximumDate === "today" ?
      new Date().toISOString().split('T')[0] :
      this.formInput.question.answerFormat.maximumDate
  }



  onBlur(): void {
    let isValid = this.formInput.form.controls[this.questionId].valid
    // This additional check is implemented because in IOS, min max attributes on date field dont work
    if (isValid && this.getMaximumDate()) {
      isValid = this.formInput.form.controls[this.questionId].value <= this.getMaximumDate()
    }
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
    return Utility.stringFormat(this.formInput.question.answerFormat.invalidMessage, [this.datePipe.transform(this.getMaximumDate())])
  }

  getPlaceholderText(): string {
    let text = this.formInput.question.placeholder ? this.formInput.question.placeholder : ""
    return text;
  }

  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }

  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == '' || !this.formInput.question.text) && !this.isOptionalQuestion()
  }


}
