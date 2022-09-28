import { Component, OnInit } from '@angular/core';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { Location } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { DataStorage } from 'src/app/utility/storage';
import { TranslateService } from '@ngx-translate/core';
declare const sendMessageToFlutter: any;


@Component({
  selector: 'app-form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {

  constructor(public formStepNavigatorService: FormStepNavigator,
    private formService: FormService,
    private location: Location,
    private route: Router,
    private subjectService: SubjectService,
    public translate: TranslateService) {
  }

  hyperlinkClicked: boolean = false
  step: any = null;
  surveyStarted: boolean = false
  routeUrl: string = ""
  visible: boolean = true

  ngOnInit(): void {
    this.route.events.subscribe(value => {
      if (value instanceof NavigationStart) {
        this.routeUrl = value.url
      }
    })
    this.formStepNavigatorService.hyperLinkClickedSubject.subscribe(isLinkClicked => {
      this.hyperlinkClicked = isLinkClicked
    })
    this.formStepNavigatorService.hyperLinkClickedStepSubject.subscribe(step => {
      this.step = step
    })
    this.formStepNavigatorService.surveyStartedSubject.subscribe(surveyStarted => {
      this.surveyStarted = surveyStarted // If survey has started, then show cancel button
    })
    this.formStepNavigatorService.footerVisible.subscribe(result=>{
      this.visible = result;
      console.log(result)
    })
  }

  getHeaderTitle(): string {
    let surveyInternalId = this.formService.selectedSurvey && this.formService.selectedSurvey.survey ? this.formService.selectedSurvey.survey.internalIdentifier : ""
    let title = ""
    switch (this.routeUrl) {
      case ("/surveys"): {
        title = this.translate.instant("survey.title")
        break
      }
      case ("/"): {
        title = this.translate.instant("survey.title")
        break
      }
      case ("/subjectProfile"): {
        title = this.translate.instant("subjectProfile.profile")
        break
      }
      case ("/sections/" + surveyInternalId): {
        title = this.translate.instant("sections.title")
        break
      }
      default: {
        if (this.surveyStarted) {
          if (this.hyperlinkClicked && this.step) {
            title = this.step.sectionTitle
          } else {
            title = this.formService.selectedSection.section ? this.formService.readSectionFromJson(this.formService.selectedSection.section.internalIdentifier) : ""
          }
        }
      }
    }
    return title;
  }

  showHeaderIcons(): boolean {
    let showIcons: boolean = false
    let surveyInternalId = this.formService.selectedSurvey && this.formService.selectedSurvey.survey ? this.formService.selectedSurvey.survey.internalIdentifier : ""
    switch (this.routeUrl) {
      case ("/surveys"): {
        showIcons = true
        break
      }
      case ("/"): {
        showIcons = true
        break
      }
      case ("/sections/" + surveyInternalId): {
        showIcons = false
        break
      }
      default: {
        showIcons = false
      }
    }
    return showIcons
  }

  onShowProfile(): void {
    this.route.navigate(['/subjectProfile'])
  }

  onCancel(): void {
    if (!this.formStepNavigatorService.isRegistrationForm()) {
      this.route.navigate(['/sections', this.formService.selectedSurvey.survey.internalIdentifier])
    } else {
      if (this.formStepNavigatorService.isLastStep()) {
        DataStorage.clearSurveyData(this.formService.selectedSurvey.id)
      }
      sendMessageToFlutter('{"screen" : "JOIN_NOW","action" : "CANCEL"}')
    }
    this.formStepNavigatorService.onSurveyCancelled()
  }

  getExitButtonText(): string {
    return this.formStepNavigatorService.isRegistrationForm() &&
      this.formStepNavigatorService.isLastStep() ? this.translate.instant("content.done") : this.translate.instant("content.cancel")
  }

  showExitButton(): boolean {
    return !this.hyperlinkClicked && this.surveyStarted
  }


  onPrev(): void {
    if (this.surveyStarted) {
      this.formStepNavigatorService.onPrev()
    } else {
      if (this.routeUrl.includes("/sections")) {
        this.route.navigate([''])
      }
      else if (this.routeUrl.includes("/subjectProfile")) {
        this.route.navigate([''])
      }
      else {
        this.route.navigate(['/sections', this.formService.selectedSurvey.survey.internalIdentifier])
      }
    }
  }


  hidePrevious(): boolean {
    return (this.surveyStarted && this.formStepNavigatorService.questionIndex === 0 &&
      this.formStepNavigatorService.childQuestionIndex === 0) ||
      (this.step && this.getHeaderTitle() == this.step.sectionTitle) ||
      (this.formStepNavigatorService.getCurrentStep() && this.formStepNavigatorService.getCurrentStep().backButtonItemIsHidden) ||
      (!this.routeUrl.includes("/form") && !this.routeUrl.includes("/sections") && !this.routeUrl.includes("/subjectProfile"))
  }



  isSurveyReadOnlyMode(): boolean {
    return this.formService.isSurveyReadOnlyMode()
  }

  onDone(): void {
    this.formStepNavigatorService.hyperLinkClickedSubject.next(false)
  }

  showPaginationOnSection(): string {
    let pagination = ""
    if (this.formStepNavigatorService.isRegistrationForm()) {
      return ""
    }
    if (this.surveyStarted) {
      let sectionNumber = { totalSectionNumber: 1, currentSectionNumber: 1 }
      if (this.formService.selectedSurvey && this.formService.selectedSurvey.sectionResponses && this.formService.selectedSection) {
        sectionNumber.totalSectionNumber = this.formService.selectedSurvey.sectionResponses.length
        sectionNumber.currentSectionNumber = this.formService.selectedSurvey.sectionResponses.findIndex(x => x.id === this.formService.selectedSection.id) + 1
      }
      pagination = this.translate.instant('sections.sectionPagination', { current: sectionNumber.currentSectionNumber, total: sectionNumber.totalSectionNumber })
    }
    return pagination
  }

}
