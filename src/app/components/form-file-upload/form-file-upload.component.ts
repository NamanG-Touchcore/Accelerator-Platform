import { Component, Input, OnInit } from '@angular/core';
import { FormInput } from 'src/app/models/form-input.model';
import { AppConfig } from 'src/app/services/app-config.service';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { Utility } from 'src/app/utility/utility';

@Component({
  selector: 'app-form-file-upload',
  templateUrl: './form-file-upload.component.html',
  styleUrls: ['./form-file-upload.component.scss']
})
export class FormFileUploadComponent implements OnInit {

  constructor(private subjectService: SubjectService, private formService: FormService, private formStepNavigatorService: FormStepNavigator, private appConfig: AppConfig) { }
  @Input() formInput: FormInput;
  questionId: string = null
  disabled: boolean = false
  selectedFile: File;
  fileUrl: string

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    let logLineRepeatKey = this.formService.getFinalLoglineRepeatKey(this.formInput.question, this.formInput.parentQuestion)
    this.questionId = `${this.formInput.question.identifier}@${logLineRepeatKey}`
    if (this.formInput.form.value[this.questionId] && this.formInput.form.value[this.questionId] != '') {
      this.fileUrl = `${this.appConfig.configuration.surveyDataBlobBaseUrl}${this.subjectService.loggedInSubject.subjectIdentifier}/${this.formService.selectedSection.id}/${this.formInput.form.value[this.questionId]}`
    }
    this.disabled = this.formService.isSurveyReadOnlyMode()
    if (Utility.isRepeatQuestion(this.formInput.question)) {
      this.questionId = this.formInput.parentQuestion ? `${this.formInput.parentQuestion.identifier}.${this.questionId}` : this.questionId
    }
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0]
      this.formService.uploadSurveyData(this.selectedFile).subscribe(result => {
        this.fileUrl = result
        this.formInput.form.patchValue({
          [this.questionId]: this.selectedFile.name.toLowerCase()
        })
        this.formStepNavigatorService.saveIndividualResponse(this.questionId, this.selectedFile.name.toLowerCase(), this.formInput.question, this.formInput.parentQuestion)
      })
    }
  }

  onRemoveAttachment(): void {
    this.formInput.form.patchValue({
      [this.questionId]: ""
    })
    this.formStepNavigatorService.saveIndividualResponse(this.questionId, "", this.formInput.question, this.formInput.parentQuestion)
    this.fileUrl = null
  }

  getFileName(): string {
    let fileUrlComponents = this.fileUrl.split('/')
    // The url is encoded format (eg: instead of space there is %20 etc)
    return decodeURI(fileUrlComponents[fileUrlComponents.length - 1])
  }

  isOptionalQuestion(): boolean {
    return this.formStepNavigatorService.isOptionalQuestion(this.formInput)
  }

  isQuestionTextEmpty(): boolean {
    return (this.formInput.question.text == '' || !this.formInput.question.text) && !this.isOptionalQuestion()
  }

}
