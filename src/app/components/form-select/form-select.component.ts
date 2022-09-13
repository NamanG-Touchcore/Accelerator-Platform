import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { DataStorage } from 'src/app/utility/storage';
import { Utility } from 'src/app/utility/utility';

@Component({
  selector: 'app-form-select',
  templateUrl: './form-select.component.html',
  styleUrls: ['./form-select.component.scss']
})
export class FormSelectComponent implements OnInit, OnChanges {

  constructor(private formService: FormService, private formStepNavigatorService: FormStepNavigator) { }
  @Input() formInput: FormInput
  questionId: string = null
  fetchedData: any = null // Used for dependent questions where the data is fetched from backend
  textChoices: any = null
  disabled: boolean = false
  ngOnInit(): void {
    if (this.isDependentQuestion()) {
      this.fetchDependentData()
    }
  }

  ngOnChanges(): void {
    this.setQuestionId()
    this.setTextChoices()
    this.disabled = this.formService.isSurveyReadOnlyMode()
  }

  setQuestionId(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    // If the question is of type anotherBg, anotherFalreup etc, parent question id is considered beacuse the formItemId is not unique
    if (Utility.isRepeatQuestion(this.formInput.question)) {
      this.questionId = this.formInput.parentQuestion ? `${this.formInput.parentQuestion.identifier}.${this.questionId}` : this.questionId
    }
  }

  setTextChoices(): void {
    this.textChoices = this.formInput.question.answerFormat.textChoices
    if (this.formInput.question.answerFormat.reverse) {
      this.textChoices = this.formInput.question.answerFormat.textChoices.slice().reverse()
    }
  }

  getPlaceholderText(): string {
    let text = this.formInput.question.placeholder ? this.formInput.question.placeholder : ""
    return text;
  }

  selectOptionChanged(): void {
    if (this.hasChildStep()) {  // Clear the child step response, if parent response changes
      this.formInput.form.patchValue({
        [this.formInput.question.childStep]: ''
      })
    }
    this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.formInput.form.value[this.questionId], this.formInput.question, this.formInput.parentQuestion)
  }

  isDependentQuestion(): boolean {
    return this.formInput.question.dependsOn ? true : false
  }

  hasChildStep(): boolean {
    return this.formInput.question.childStep ? true : false
  }

  fetchDependentData(): void {
    let dependentValue = DataStorage.getFormQuestionResponse(this.formService.selectedSection.id, this.formInput.question.dependsOn, this.formService.selectedSurvey.id)
    if (!dependentValue) {
      return
    }
    let apiEndpoint = this.formInput.question.apiEndpoint ? this.formInput.question.apiEndpoint.replace("{dependsOn}", dependentValue) : this.formInput.question.apiEndpoint;
    this.fetchedData = this.formService.getDependentData(apiEndpoint)
  }


  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }
  
  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == ''|| !this.formInput.question.text) && !this.formInput.question.isOptional
  }

}
