import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { FormInput } from '../../models/form-input.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-textbox',
  templateUrl: './form-textbox.component.html',
  styleUrls: ['./form-textbox.component.scss']
})
export class FormTextboxComponent implements OnInit, OnChanges {

  constructor(private formStepNavigatorService: FormStepNavigator, private formService: FormService, public translate: TranslateService) { }

  @Input() formInput: FormInput
  questionId: string = null
  type: string = "text";
  displayStaticModalStyle: string = "none"
  displayLoadingModalStyle: string = "none"
  waitAlertValidationFailed: boolean = false
  validationSuccessfull: boolean = undefined
  disabled: boolean = false
  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.type = "text"
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    if (this.formInput.question.answerFormat.keyboardType === "decimalPad" || this.formInput.question.answerFormat.keyboardType === "numberPad") {
      this.type = "number"
    }
    if (this.formStepNavigatorService.responseValidity[this.formInput.question.identifier] === false) {
      this.validationSuccessfull = false
    }
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }



  onBlur(): void {
    if (!this.formInput.form.controls[this.questionId].value || this.formInput.form.controls[this.questionId].value == "")
      return
    let isValid = this.formInput.form.controls[this.questionId].valid
    if (isValid) {
      this.validationSuccessfull = undefined
      if (this.formInput.form.value[this.questionId]) {
        this.validationSuccessfull = true
      }
      if (this.formInput.question.waitAlert) {
        this.displayLoadingModalStyle = "block"
        this.validateResponseFromBackend(this.formInput.question.waitAlert, this.formInput.form.controls[this.questionId].value)
      } else {
        this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.formInput.form.value[this.questionId], this.formInput.question, this.formInput.parentQuestion)
      }
    } else {
      this.validationSuccessfull = false
      if (this.formInput.question.answerFormat.invalidMessage) {
        this.openStaticModal()
      }
    }
    this.formStepNavigatorService.setResponseValidity(this.formInput.question.identifier, isValid)
  }

  isEmptyResponse(): boolean {
    return this.formInput.form.controls[this.questionId].value && this.formInput.form.controls[this.questionId].value !== "" ? false : true
  }

  validateResponseFromBackend(waitAlert: any, value: string): void {
    if (waitAlert.type === "Email") {
      value = encodeURIComponent(value)
    }
    let apiEndpoint = waitAlert.apiEndpoint ? waitAlert.apiEndpoint.replace("{value}", value) : waitAlert.apiEndpoint
    this.formService.validateResponseFromBackend(apiEndpoint).subscribe({
      next: (response) => {
        if (waitAlert.type === "OrganizationID") {
          let studySite = response.studySites.filter(ob => ob.isDefaultSite === true)
          if (studySite.length > 0) {
            this.formService.setDefaultStudySite(studySite[0].id)
          }
        }
        this.closeLoadingModal()
        this.validationSuccessfull = true
        this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.formInput.form.value[this.questionId], this.formInput.question, this.formInput.parentQuestion)
      },
      error: (error) => {
        this.formStepNavigatorService.setResponseValidity(this.formInput.question.identifier, false)
        this.waitAlertValidationFailed = true
        this.openStaticModal()
        this.validationSuccessfull = false
        this.closeLoadingModal()
      }
    })
  }

  onStaticModalClose(): void {
    this.displayStaticModalStyle = "none"
    // Resetting the value
    this.waitAlertValidationFailed = false
  }

  openStaticModal(): void {
    this.displayStaticModalStyle = "block"
  }

  closeLoadingModal(): void {
    this.displayLoadingModalStyle = "none"
  }

  getInvalidMessage(): string {
    let message = this.waitAlertValidationFailed ? this.formInput.question.waitAlert.message : this.formInput.question.answerFormat.invalidMessage
    return message
  }

  getLoadingMessage(): string {
    return this.formInput.question.waitAlert ? this.formInput.question.waitAlert.loadingMessage : ""
  }

  getStaticModalTitle(): string {
    let message = this.waitAlertValidationFailed ? this.formInput.question.waitAlert.title : this.translate.instant("content.invalidValue")
    return message;
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
    return (this.formInput.question.text == '' || !this.formInput.question.text) && !this.formInput.question.isOptional
  }


}
