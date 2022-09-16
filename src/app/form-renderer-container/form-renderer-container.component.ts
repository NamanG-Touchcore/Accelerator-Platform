import { Component, OnInit, AfterViewInit } from '@angular/core';

import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { Location } from '@angular/common';
import { NavigationStart, Router } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { DataStorage } from 'src/app/utility/storage';
import { TranslateService } from '@ngx-translate/core';
declare const sendMessageToFlutter: any;
@Component({
  selector: 'app-form-renderer-container',
  templateUrl: './form-renderer-container.component.html',
  styleUrls: ['./form-renderer-container.component.scss']
})
export class FormRendererContainerComponent implements OnInit, AfterViewInit {

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
  formHeaderTitle:string=""
  formHeaderPagination:string=""

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
    this.formHeaderTitle = this.getHeaderTitle()
    this.formHeaderPagination = this.showPaginationOnSection()
  }
  ngAfterViewInit() {
    this.formHeaderTitle = this.getHeaderTitle()
    this.formHeaderPagination = this.showPaginationOnSection()
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
    console.log('form title',title)
    return title;
  }








  isSurveyReadOnlyMode(): boolean {
    return this.formService.isSurveyReadOnlyMode()
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
