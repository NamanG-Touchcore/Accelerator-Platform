import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyConstants } from '../constants/survey-constants.enum';
import moment from 'moment';
import { UiConfiguration } from '../ui-configuration';
import { SectionResponseProgress } from '../models/section-response-progress.model';
import { SectionResponse } from '../models/section-response.model';
import { SubjectSurveyResponse } from '../models/subject-survey-response.model';
import { FormStepNavigator } from '../services/form-step-navigator.service';
import { FormService } from '../services/form.service';
import { DataStorage } from '../utility/storage';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Utility } from "../utility/utility";
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-list-survey-section',
  templateUrl: './list-survey-section.component.html',
  styleUrls: ['./list-survey-section.component.scss']
})
export class ListSurveySectionComponent implements OnInit {

  constructor(private CookieService: CookieService,private deviceService: DeviceDetectorService, private formService: FormService, private formStepNavigatorService: FormStepNavigator, private route: ActivatedRoute, private router: Router, public translate: TranslateService) { }

  surveyInternalId: string;
  surveyResponse: SubjectSurveyResponse = null
  expiresInDays: number = -1;
  expiryDate: any;

  ngOnInit(): void {
    this.surveyInternalId = this.route.snapshot.paramMap.get('surveyInternalId')
    this.surveyResponse = this.formService.selectedSurvey
    // console.log('this.surveyResponse',this.surveyResponse)
    if (!this.surveyResponse) {  // Page has been reloaded
      this.router.navigate([''])
    }
    this.formStepNavigatorService.onSurveyCancelled()
    this.formStepNavigatorService.surveyStartedSubject.next(false) //  When the user clicks on cancel button, reset the surveyStarted to false
    // this.CookieService.set('app_downloaded_for_first_time', 'NO')
  }

  calculateSectionProgressPercentage(section: SectionResponse): number {
    let sectionProgress = DataStorage.getSectionProgress(section.id, this.surveyResponse.id)
    let progressPercentage: number = 0;
    if (section.completionStatus && section.completionStatus.internalIdentifier == SurveyConstants.COMPLETED_COMPLETION_STATUS) {
      progressPercentage = 100
    }
    else if (sectionProgress) {
      progressPercentage = sectionProgress.progressPercentage
    }// This value is fethed from backend
    else if (section.surveySectionResponseProgress) {
      progressPercentage = section.surveySectionResponseProgress.percentageCompleted
    }
    return progressPercentage
  }

  getSurveyExpiryText(): string {
    let expiryText = null
    if (!this.surveyResponse.closeDate || this.surveyResponse.completionDate) {
      return expiryText
    }
    this.expiresInDays = this.formService.getSurveyExpiryDays(this.surveyResponse.closeDate)
    if (this.expiresInDays > 30) {
      this.expiryDate = `Expires on ${moment(this.surveyResponse.closeDate).locale('en').format('DD-MMM-YYYY')}`
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

  onSectionClick(section: SectionResponse): void {
    if (this.formService.isSurveyReadOnlyMode()) {
      this.formService.setSelectedSurveySection(section)
      this.router.navigate(['/form', this.surveyInternalId, section.section.internalIdentifier])
    } else {
      // let requestPayload = {
      //   completionStatusIdentifier: SurveyConstants.PARTIAL_COMPLETION_STATUS,
      //   sectionResponseId: section.id,
      // }
      // this.formService.updateSurveySectionStatus(requestPayload, section.id).subscribe(result => {
      // })
      this.formService.setSelectedSurveySection(section)
      if(this.deviceService.isMobile() && this.deviceService.isTablet()){
        this.router.navigate(['/form', this.surveyInternalId, section.section.internalIdentifier], { queryParams: { m: 2 } })
      }
      else if(this.deviceService.isDesktop()){
        this.router.navigate(['/form', this.surveyInternalId, section.section.internalIdentifier], { queryParams: { m: 1 } })
      }
      else {
        this.router.navigate(['/form', this.surveyInternalId, section.section.internalIdentifier], { queryParams: { m: 2 } })
      }
    }
  }

}
