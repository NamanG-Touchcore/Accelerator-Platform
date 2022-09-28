import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { FormService } from '../services/form.service';
import { FormStepNavigator } from '../services/form-step-navigator.service';
import { FormInput } from '../models/form-input.model';
import { SubjectService } from '../services/subject.service';
import { DataStorage } from '../utility/storage';
import { DomSanitizer } from '@angular/platform-browser';


const cssFiles=['../../mirrorar.scss', '../../accelerator.scss'];
let currentCssFile=0;

@Component({

  selector: 'app-form-renderer',
  templateUrl: './form-renderer.component.html',
  styleUrls: ['./form-renderer.component.scss', cssFiles[currentCssFile]],
  encapsulation: ViewEncapsulation.None
})
export class FormRenderer implements OnInit {
  constructor(
    private formService: FormService,
    private formStepNavigatorService: FormStepNavigator,
    private router: Router,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private sanitizer: DomSanitizer
    ) {}
    // styleUrl: string = 'assets/css/form-renderer.css';

//  changeCSSStyle() {
//   this.styleUrl = (this.styleUrl === './app.component.css') ? './another.css' : './app.component.css';
// }

  sectionConfiguration: any = null;
  form: FormGroup;
  questionIndex: number = 0;
  childQuestionIndex: number = 0;
  mode: number = null;
  hyperlinkClicked: boolean = false;

  getFormInputModel(question, form, parentQuestion = null): FormInput {
    return this.formService.getFormInputModel(question, form, parentQuestion);
  }

  ngOnInit(): void {
    console.log(localStorage.getItem('s1'))
    if (!this.formService.configuration) {
      // this.route.navigate(['']);
      this.formService.setSurveyConfiguration('')
    }
    this.route.queryParams.subscribe((params) => {
      console.log(params);
      this.mode = params['m'];
      if (this.mode == 1) {
        this.formStepNavigatorService.footerVisible.next(false);
      } else if (this.mode == 2) {
        this.formStepNavigatorService.footerVisible.next(true);
      }
    });
    this.route.params.subscribe((params) => {
      let sectionInternalId = params['sectionInternalId'];
      // console.log(sectionInternalId)
      this.setupConfiguration(sectionInternalId);
    });
    this.formStepNavigatorService.childQuestionIndexSubject.subscribe(
      (childQuestionIndex) => {
        this.childQuestionIndex = childQuestionIndex;
      }
    );
    this.formStepNavigatorService.questionIndexSubject.subscribe(
      (questionIndex) => {
        this.questionIndex = questionIndex;
        console.log(this.questionIndex);
      }
    );
    this.formStepNavigatorService.hyperLinkClickedSubject.subscribe(
      (isLinkClicked) => {
        this.hyperlinkClicked = isLinkClicked;
      }
    );
    // this.formStepNavigatorService.stepsUpdateSubject.subscribe((updates) => {
    //   // this.sectionConfiguration.steps = updates;
    //   // console.log(this.sectionConfiguration.steps);
    // });
    // console.log(this.formService.configuration)
    console.log('this.sectionConfiguration',this.sectionConfiguration);
  }

  setupConfiguration(sectionInternalId: string): void {
    if (
      this.formService.configuration &&
      this.formService.configuration.task === 'form'
    ) {
      this.sectionConfiguration = this.formService.configuration;
      // console.log('this.sectionConfiguration',this.sectionConfiguration)
    } else {
      this.sectionConfiguration =
        this.formService.getSurveySectionConfiguration(sectionInternalId);
      // console.log('this.sectionConfiguration',this.sectionConfiguration)
    }
    let initialized = this.formService.initializeSectionResponseAndProgress();
    // if (!initialized) {
    //   this.formService.fetchSurveySectionResponses().subscribe(result => {
    // console.log(result)
    //     DataStorage.initializeSurveySectionResponse(this.formService.selectedSection.id, this.formService.selectedSurvey.id, result)
    //     this.completeSetup()
    //   })
    // } else {
    // }
    // if (this.sectionConfiguration.paramEndpoint) {
    //     this.formService.getParamValues(this.subjectService.loggedInSubject.subjectId, this.sectionConfiguration.paramEndpoint).subscribe(result => {
    // console.log(result)
    //         this.formStepNavigatorService.saveParamValues(result)
    //       })
    //     }
    this.completeSetup();
  }

  completeSetup(): void {
    this.form = this.formService.getSectionForm(this.sectionConfiguration);
    // console.log('this.form',this.form)
    // console.log('this.sectionConfiguration',this.sectionConfiguration)
    // console.log('this.form',this.form)
    this.formStepNavigatorService.saveConfigurationAndForm(
      this.sectionConfiguration,
      this.form
    );
    // This is to set the parent and child question indexes to the last visited indexes if applicable from local storage
    // this.formStepNavigatorService.setAllIndexesAndProgress();
    this.formStepNavigatorService.setInitialHtmlContent();
  }
}
