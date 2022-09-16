import { Component, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';

import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { Location } from '@angular/common';
import { NavigationStart, Router, ActivatedRoute } from '@angular/router';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { DataStorage } from 'src/app/utility/storage';
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
    private formService: FormService,
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
  ngOnInit(): void {
    console.log(
      'this.formService.configuration',
      this.formService.configuration
    );
    this.router.params.subscribe((params) => {
      let sectionInternalId = params['sectionInternalId'];
      let surveyInternalId = params['surveyInternalId'];
      this.sectionInternalId = sectionInternalId;
      this.surveyInternalId = surveyInternalId;
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
    console.log(sectionIndex);
    if (sectionIndex == this.formService.configuration.sections.length - 1) {
      return;
    } else {
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
  onPrev(): void {
    let sectionIndex = this.formService.configuration.sections.findIndex(
      (el) => el.identifier == this.sectionInternalId
    );
    console.log('sectionIndex');
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
