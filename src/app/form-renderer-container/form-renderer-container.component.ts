import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { Location } from '@angular/common';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { SubjectSurveyResponse } from '../models/subject-survey-response.model';
import { TranslateService } from '@ngx-translate/core';
import { DeviceDetectorService } from 'ngx-device-detector';

declare const sendMessageToFlutter: any;
@Component({
  selector: 'app-form-renderer-container',
  templateUrl: './form-renderer-container.component.html',
  styleUrls: ['./form-renderer-container.component.scss'],
})
export class FormRendererContainerComponent implements OnInit {
  constructor(
    public formStepNavigatorService: FormStepNavigator,
    public formService: FormService,
    private location: Location,
    private route: Router,
    private subjectService: SubjectService,
    private router: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    public translate: TranslateService
  ) {}

  hyperlinkClicked: boolean = false;
  step: any = null;
  surveyStarted: boolean = false;
  routeUrl: string = '';
  formHeaderTitle: string = '';
  formHeaderPagination: string = '';
  sectionInternalId: string = '';
  surveyInternalId: string = '';
  next:boolean=false;
  prev:boolean=false;
  surveyResponse: any = null;

  ngOnInit(): void {
    // console.log(
      //   'this.formService.configuration',
      //   this.formService.configuration
      // );
      if (!this.formService.configuration) {
        // this.route.navigate(['']);
        this.formService.setSurveyConfiguration('')
      }
      this.router.params.subscribe((params) => {
        this.sectionInternalId = params['sectionInternalId'];
        this.surveyInternalId = params['surveyInternalId'];
        this.surveyResponse = this.formService.getOpenedSurvey(this.surveyInternalId)
        console.log(this.surveyResponse.survey.initiatingEventInterval)
    });
  }
  getCurrentSection(): number {
    let sectionIndex = this.getCurrentSectionIndex();
    return sectionIndex + 1
  }
  getTotalSections() : number {
    return this.formService.configuration.sections.length;
  }
  getCurrentSectionIndex(): number {
    let sectionIndex = this.formService.configuration.sections.findIndex(
      (el) => el.identifier == this.sectionInternalId
    );
    return sectionIndex;
  }
  onNext(): void {
    let sectionIndex = this.getCurrentSectionIndex();
    // console.log(sectionIndex);
    if (sectionIndex == this.formService.configuration.sections.length - 1) {
      return;
    } else {
      this.next=(sectionIndex == this.formService.configuration.sections.length - 2)?true:false;
      this.sectionInternalId =
        this.formService.configuration.sections[sectionIndex + 1].identifier;
      if (this.deviceService.isMobile() && this.deviceService.isTablet()) {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 2 } }
        );
      } else if (this.deviceService.isDesktop()) {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 1 } }
        );
      } else {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 2 } }
        );
      }
    }
  }

  checkNext(){
    let sectionIndex = this.getCurrentSectionIndex();
    return (sectionIndex == this.formService.configuration.sections.length - 1)?true:false;
  }
  checkPrev(){
    let sectionIndex = this.getCurrentSectionIndex();
    return (sectionIndex <=0)?true:false;

  }
  onPrev(): void {
    let sectionIndex=this.getCurrentSectionIndex();
    // console.log('sectionIndex');
    if (sectionIndex == 0) {
      return;
    } else {
      this.sectionInternalId =
        this.formService.configuration.sections[sectionIndex - 1].identifier;
      if (this.deviceService.isMobile() && this.deviceService.isTablet()) {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 2 } }
        );
      } else if (this.deviceService.isDesktop()) {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 1 } }
        );
      } else {
        this.route.navigate(
          ['/form', this.surveyInternalId, this.sectionInternalId],
          { queryParams: { m: 2 } }
        );
      }
    }
  }
  getHeaderTitle(): string {
    let title = this.formService.readSectionFromJson(this.sectionInternalId)
    return title;
  }

  isSurveyReadOnlyMode(): boolean {
    return this.formService.isSurveyReadOnlyMode();
  }


}
