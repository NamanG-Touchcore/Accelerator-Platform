import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { SurveyConstants } from '../constants/survey-constants.enum';
import { SubjectSurveyResponse } from '../models/subject-survey-response.model';
import { SectionResponseProgress } from '../models/section-response-progress.model';
import { SurveyResponseStatus } from '../models/survey-response-status.model';
import { SubjectService } from '../services/subject.service';
import { FormService } from '../services/form.service';
import { DataStorage } from '../utility/storage';
import moment from 'moment';
import { UiConfiguration } from '../ui-configuration';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-list-survey',
  templateUrl: './list-survey.component.html',
  styleUrls: ['./list-survey.component.scss']
})
export class ListSurveyComponent implements OnInit {

  surveyResponses: SubjectSurveyResponse[];
  openNowSurveys: SubjectSurveyResponse[] = [];
  upcomingSurveys: SubjectSurveyResponse[] = [];
  pastSurveys: SubjectSurveyResponse[] = [];
  expiresInDays: number = -1;
  expiryDate: any;
  displaySignatureInfo: string = 'none'

  constructor(private formService: FormService, private router: Router, private subjectService: SubjectService, public translate: TranslateService) { }
  @ViewChild('modalTriggerButton') modalTriggerButton: ElementRef<HTMLElement>
  ngOnInit(): void {
    // if (!this.subjectService.loggedInSubject) {
    //   this.router.navigate([''])
    // }
    let result = this.formService.getSurveyResponses()
      this.surveyResponses = result;
      this.categorizeSurveys()
    // this.formService.getSurveyResponses(this.subjectService.loggedInSubject.subjectId).subscribe(result => {
    //   this.surveyResponses = result;
    //   this.categorizeSurveys()
    //   })
    console.log(this.openNowSurveys, this.pastSurveys, this.upcomingSurveys, this.surveyResponses)
  }
  
  onInfoButtonClick(): void {
    this.displaySignatureInfo = "block"
  }

  closeModal(): void {
    this.displaySignatureInfo = "none"
  }

  surveyRequiresSignature(surveyResponseId: string): boolean {
    return this.formService.eSignatureRequiredForSurvey(surveyResponseId)
  }

  categorizeSurveys(): void {
    this.openNowSurveys = this.surveyResponses.filter(x => (
      (x.timelineStatus.internalIdentifier === SurveyConstants.OPEN_TIMELINE_STATUS &&
        x.survey.internalIdentifier !== "WITHDRAWSURVEY" &&
        x.completionStatus.internalIdentifier !== SurveyConstants.COMPLETED_COMPLETION_STATUS &&
        x.completionStatus.internalIdentifier !== SurveyConstants.SUBMITTED_COMPLETION_STATUS &&
        x.overrideStatus.internalIdentifier !== SurveyConstants.ONHOLD_OVERRIDE_STATUS &&
        x.overrideStatus.internalIdentifier !== SurveyConstants.ENDED_OVERRIDE_STATUS) || (x.overrideStatus.internalIdentifier === SurveyConstants.FORCED_OPEN_OVERRIDE_STATUS)
    ));
    this.upcomingSurveys = this.surveyResponses.filter(x => (
      x.timelineStatus.internalIdentifier === SurveyConstants.DUE_FUTURE_TIMELINE_STATUS &&
      x.survey.internalIdentifier != "WITHDRAWSURVEY" &&
      x.overrideStatus.internalIdentifier !== SurveyConstants.ONHOLD_OVERRIDE_STATUS &&
      x.overrideStatus.internalIdentifier !== SurveyConstants.ENDED_OVERRIDE_STATUS &&
      x.overrideStatus.internalIdentifier !== SurveyConstants.FORCED_OPEN_OVERRIDE_STATUS
    ));
    this.pastSurveys = this.surveyResponses.filter(x => (
      (x.timelineStatus.internalIdentifier == SurveyConstants.PAST_DUE_TIMELINE_STATUS ||
        x.completionStatus.internalIdentifier === SurveyConstants.COMPLETED_COMPLETION_STATUS ||
        x.completionStatus.internalIdentifier === SurveyConstants.SUBMITTED_COMPLETION_STATUS) &&
      x.survey.internalIdentifier != "WITHDRAWSURVEY" &&
      x.overrideStatus.internalIdentifier !== SurveyConstants.ONHOLD_OVERRIDE_STATUS &&
      x.overrideStatus.internalIdentifier !== SurveyConstants.ENDED_OVERRIDE_STATUS
    ));
    this.pastSurveys.sort((firstSurvey, secondSurvey) => {
      let firstDate: any
      let secondDate: any
      if (firstSurvey.completionDate && secondSurvey.completionDate) {
        firstDate = new Date(firstSurvey.completionDate);
        secondDate = new Date(secondSurvey.completionDate);
      }
      else if (firstSurvey.openDate && secondSurvey.openDate) {
        firstDate = new Date(firstSurvey.openDate);
        secondDate = new Date(secondSurvey.openDate);
      }
      return secondDate - firstDate
    })
  }

  getSurveyProgressPercentage(item: SubjectSurveyResponse): number {
    let surveyPercentage: number = 0;
    let totalSumofAllSections: number = 0;
    let totalSection: number = item.sectionResponses.length * 100
    let sectionProgresses: SectionResponseProgress[] = DataStorage.getSurveySectionsProgress(item.id)
    totalSumofAllSections = this.calculateSumBasedOnSectionProgress(item, sectionProgresses)
    surveyPercentage = (totalSumofAllSections / totalSection) * 100;
    return surveyPercentage;
  }

  calculateSumBasedOnSectionProgress(selectedSurvey: SubjectSurveyResponse, sectionProgresses: SectionResponseProgress[]): number {
    let totalSumofAllSections: number = 0
    for (let sectionResponse of selectedSurvey.sectionResponses) {
      let sectionProgressStoredLocally = sectionProgresses ? sectionProgresses.filter(ob => ob.sectionResponseId == sectionResponse.id)[0] : null
      if (sectionResponse.completionStatus && sectionResponse.completionStatus.internalIdentifier == SurveyConstants.COMPLETED_COMPLETION_STATUS) {
        totalSumofAllSections += 100
      }
      else if (sectionProgressStoredLocally) {
        totalSumofAllSections += sectionProgressStoredLocally.progressPercentage
      } // This value is fetched from backend
      else if (sectionResponse.surveySectionResponseProgress) {
        totalSumofAllSections += sectionResponse.surveySectionResponseProgress.percentageCompleted
      }
    }
    return totalSumofAllSections
  }

  getSurveyExpiryText(survey: SubjectSurveyResponse): string {
    let expiryText = null
    if (!survey.closeDate) {
      return expiryText
    }
    this.expiresInDays = this.formService.getSurveyExpiryDays(survey.closeDate)
    if (this.expiresInDays > 30) {
      this.expiryDate = `Expires on ${moment(survey.closeDate).locale('en').format('DD-MMM-YYYY')}`
      return this.expiryDate
    } else {
      expiryText = this.expiresInDays > 1 ? this.translate.instant('content.expireInDays', { diffrence: this.expiresInDays }) : this.translate.instant('content.expireInDay', { diffrence: this.expiresInDays })
    }
    return expiryText
  }

  getSurveyExpiryTextClassName(): string {
    if (UiConfiguration.expiryRangeRed.start <= this.expiresInDays && this.expiresInDays <= UiConfiguration.expiryRangeRed.end) {
      return 'danger';
    }
    if (UiConfiguration.expiryRangeOrange.start <= this.expiresInDays && this.expiresInDays <= UiConfiguration.expiryRangeOrange.end) {
      return 'warning';
    }
    return 'message';

  }

  isSurveyStatusReopened(item: SubjectSurveyResponse): boolean {
    return item.overrideStatus.internalIdentifier === SurveyConstants.FORCED_OPEN_OVERRIDE_STATUS
  }



  onSurveyClick(item: SubjectSurveyResponse, surveyCategory: string): void {
    console.log('item',item)
    console.log('item',surveyCategory)
    if (surveyCategory == 'past' && this.isSurveyStatusReopened(item)) {
      return
    }
    let surveyConfigurationPromise = this.formService.setSurveyConfiguration(item.survey.id)
    let observablesArray: Observable<any>[] = [surveyConfigurationPromise]
    if (!this.isSurveyStarted(item) && !this.formService.isSurveyPast(item)) {
      let updateSurveyStatusRequestPayload: SurveyResponseStatus = new SurveyResponseStatus(
        item.id,
        SurveyConstants.PARTIAL_COMPLETION_STATUS,
        SurveyConstants.SURVEY_MEDIUM_MOBILE
      )
      let updateSurveyStatusPromise = this.formService.updateSurveyStatus(item.id, updateSurveyStatusRequestPayload)
      observablesArray.push(updateSurveyStatusPromise)
    }
    forkJoin(observablesArray).subscribe(([]) => {
      this.formService.setSelectedSurvey(item)
      this.router.navigate(['/sections', item.survey.internalIdentifier])
    })
  }

  isSurveyStarted(item: SubjectSurveyResponse): boolean {
    let started = true
    if (item.completionStatus.internalIdentifier === SurveyConstants.NOTSTARTED_COMPLETION_STATUS) {
      started = false
    }
    return started
  }

  isSurveyEligibleForMobile(item: SubjectSurveyResponse): boolean {
    let isEligible: boolean = false;
    if ((item.lastUsedMedium === null ||
      item.lastUsedMedium.internalIdentifier === SurveyConstants.SURVEY_MEDIUM_MOBILE) &&
      item.timelineStatus.internalIdentifier === SurveyConstants.OPEN_TIMELINE_STATUS
    ) {
      isEligible = true;
    }
    return isEligible;
  }

  isSurveyMediumMobile(item: SubjectSurveyResponse) {
    return item.lastUsedMedium === null || item.lastUsedMedium.internalIdentifier === SurveyConstants.SURVEY_MEDIUM_MOBILE
  }
}
