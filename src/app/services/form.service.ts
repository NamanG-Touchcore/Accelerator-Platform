import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, ReplaySubject, Subject, of } from 'rxjs';
import { SurveyConstants } from '../constants/survey-constants.enum';
import { SectionHTMLContent } from '../models/section-html-content.model';
import { SectionResponse } from '../models/section-response.model';
import { SubjectSurveyResponse } from '../models/subject-survey-response.model';
import { SurveyCompletion } from '../models/survey-completion.model';
import { SurveyResponseStatus } from '../models/survey-response-status.model';
import { survey } from '../static-data/survey-data';
import { registrationConfiguration } from '../static-data/registration-data';
import { Utility } from '../utility/utility';
import { CustomValidators } from '../utility/custom-validators';
import { SectionCompletion } from '../models/section-completion.model';
import { SurveySectionResponseItemData } from '../models/survey-section-response-item-data.model';
import { SubjectService } from './subject.service';
import { LegalStatement } from '../models/legal-statement.model';
import { ApiEndpoints } from '../constants/api-endpoints';
import { FormInput } from '../models/form-input.model';
import { DataStorage } from '../utility/storage';
import { LegalAgreementResponse } from '../models/legal-agreement-response.model';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

import { SubjectProfile } from '../models/subject-profile.model';
import { AppConfig } from './app-config.service';
import { surveyResponsesFromJson } from './SurveyResponses';
import { dummyData } from './SectionStepsData';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor(
    private CookieService: CookieService,
    private http: HttpClient,
    private subjectService: SubjectService,
    public translate: TranslateService,
    private appConfig: AppConfig
  ) {}

  configuration: any;
  legalAgreement: any;
  surveyResponses: SubjectSurveyResponse[];
  selectedSurvey: SubjectSurveyResponse = null;
  sectionHtmlContentSubject = new ReplaySubject<SectionHTMLContent[]>(1);
  allStepsHtmlContent: SectionHTMLContent[] = [];
  selectedSection: SectionResponse = null;
  defaultStudySiteId: string = null; // Used in registration
  legalStatement: LegalStatement[] = [];
  registrationCompletedSubject = new Subject<boolean>(); // true value is emitted when the registration is successfully completed.

  setSurveyConfiguration(surveyId: string): Observable<any> {
    let loaderMessage = '';
    // if (this.CookieService.get('app_downloaded_for_first_time') == 'YES') {
    //     loaderMessage = this.translate.instant("content.downloadSurvey")
    // } else {
    // loaderMessage = this.translate.instant("content.loading")
    // }
    // let params = {
    //     loader: true,
    //     message: loaderMessage
    // }
    // let apiEndpoint = Utility.stringFormat(ApiEndpoints.SURVEY_CONFIGURATION, [surveyId, this.subjectService.loggedInSubject.preferredLanguage])
    // return this.http.get<string>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`, { params: params }).pipe(map(result => {
    // }))
    this.configuration = dummyData;
    //         return this.configuration
    // return new Promise<any>((resolve, reject) => {
    //     resolve(this.configuration)
    // }
    return of(this.configuration);
  }

  getLoggedInUserDetails(): Observable<any> {
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${ApiEndpoints.GET_LOGGED_IN_USER_DETAILS}`
    );
  }

  getPasswordEncryptionKey(): Observable<any> {
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${ApiEndpoints.FETCH_PASSWORD_ENCRYPTION_KEY}`,
      { responseType: 'text' }
    );
  }
  getOpenedSurvey(surveyIdentifier:string):any {
    let surveyIndex = surveyResponsesFromJson.findIndex(el => surveyIdentifier == el.survey.internalIdentifier)
    return surveyResponsesFromJson[surveyIndex];
  }
  eSignatureRequiredForSurvey(surveyResponseId: string): boolean {
    let requiresESignature: boolean = false;
    let surveyResponse = this.surveyResponses.filter(
      (ob) => ob.id == surveyResponseId
    )[0];
    if (!surveyResponse || !surveyResponse.survey.configurationSettings) {
      return requiresESignature;
    }
    let requiresESignatureSetting =
      surveyResponse.survey.configurationSettings.filter(
        (ob) => ob.settingName === SurveyConstants.REQUIRES_SIGNATURE
      )[0];
    if (!requiresESignatureSetting) {
      return requiresESignature;
    }
    requiresESignature = eval(requiresESignatureSetting.settingValue);
    return requiresESignature;
  }

  authenticateUser(userDetails: any): Observable<any> {
    let params = {
      validation: true,
    };
    return this.http.post(
      `${this.appConfig.configuration.baseUrl}${ApiEndpoints.AUTHENTICATE_USER}`,
      userDetails,
      { params: params }
    );
  }

  getSections():any {
    // console.log(surveyResponsesFromJson[])
    return surveyResponsesFromJson[0].sectionResponses
  }

  setRegistrationConfiguration(): Observable<any> {
    let params = {
      loader: true,
      message: '',
    };
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.REGISTRATION_CONFIGURATION,
      [this.subjectService.loggedInSubject.preferredLanguage]
    );
    return this.http
      .get<string>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`, {
        params: params,
      })
      .pipe(
        map((result) => {
          this.configuration = result;
          return this.configuration;
        })
      );
  }

  isSurveyReadOnlyMode(): boolean {
    let readOnlyMode: boolean = false;
    if (!this.surveyResponses || !this.selectedSurvey) {
      return readOnlyMode;
    }
    let surveyResponse = this.surveyResponses.filter(
      (ob) => ob.id === this.selectedSurvey.id
    );
    if (surveyResponse.length > 0) {
      let response = surveyResponse[0];
      readOnlyMode = this.isSurveyPast(response);
    }
    return readOnlyMode;
  }

  isSurveyPast(response: SubjectSurveyResponse): boolean {
    return (
      (response.timelineStatus.internalIdentifier ===
        SurveyConstants.PAST_DUE_TIMELINE_STATUS ||
        response.completionStatus.internalIdentifier ===
          SurveyConstants.COMPLETED_COMPLETION_STATUS ||
        response.completionStatus.internalIdentifier ===
          SurveyConstants.SUBMITTED_COMPLETION_STATUS) &&
      response.overrideStatus.internalIdentifier !==
        SurveyConstants.FORCED_OPEN_OVERRIDE_STATUS
    );
  }

  getLegalAgreement(personId: string): Observable<any> {
    let apiEndpoint = Utility.stringFormat(ApiEndpoints.FETCH_LEGAL_STATEMENT, [
      personId,
      this.subjectService.loggedInSubject.preferredLanguage,
    ]);
    return this.http
      .get<any>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`)
      .pipe(
        map((result) => {
          this.legalAgreement = result;
          return this.legalAgreement;
        })
      );
  }

  getAuthenticationRefreshToken(refreshToken: string): Observable<any> {
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.FETCH_ACCESS_TOKEN_FROM_REFRESH_TOKEN,
      [refreshToken]
    );
    return this.http.get<any>(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`
    );
  }

  updateLegalAgreement(
    personId: string,
    requestPayload: LegalAgreementResponse[]
  ): Observable<any> {
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.UPDATE_LEGAL_STATEMENT,
      [personId]
    );
    return this.http.post(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      requestPayload
    );
  }

  getOrganizationStudySites(organizationId: string): Observable<any> {
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.ORGANIZATION_STUDY_SITES,
      [organizationId]
    );
    return this.http
      .get<any>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`)
      .pipe(
        map((result) => {
          return result.studySites.filter((ob) => ob.isDefaultSite);
        })
      );
  }

  validateResponseFromBackend(apiEndpoint: string): Observable<any> {
    let params = {
      validation: true,
    };
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      { params: params }
    );
  }

  // This is used for registration
  setDefaultStudySite(studySite: string) {
    this.defaultStudySiteId = studySite;
  }

  setLegalStatement(statementAgreement: LegalStatement) {
    this.legalStatement.push(statementAgreement);
  }

  getDependentData(apiEndpoint: string): Observable<any> {
    return this.http.get<any>(
      this.appConfig.configuration.baseUrl + apiEndpoint
    );
  }

  // getSurveyResponses(subjectId: string): Observable<SubjectSurveyResponse[]> {
  //     let params = {
  //         loader: true,
  //         message: ""
  //     }
  //     let apiEndpoint = Utility.stringFormat(ApiEndpoints.SURVEY_RESPONSES, [subjectId])
  //     return this.http.get<SubjectSurveyResponse[]>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`, { params: params }).pipe(map(result => {
  //         this.surveyResponses = this.getSortedSurveySectionResponses(result)
  //         return this.surveyResponses
  //     }))
  // } one
  getSurveyResponses() {
    // let params = {
    //     loader: true,
    //     message: ""
    // }
    // let apiEndpoint = Utility.stringFormat(ApiEndpoints.SURVEY_RESPONSES, [subjectId])
    // return this.http.get<SubjectSurveyResponse[]>(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`, { params: params }).pipe(map(result => {
    // }))
    this.surveyResponses = this.getSortedSurveySectionResponses(
      surveyResponsesFromJson
    );
    return this.surveyResponses;
  }

  // Sorts the section responses in ascending order based on ordinal
  getSortedSurveySectionResponses(
    surveyResponses: SubjectSurveyResponse[]
  ): SubjectSurveyResponse[] {
    for (let surveyResponse of surveyResponses) {
      surveyResponse.sectionResponses.sort((a, b) => a.ordinal - b.ordinal);
    }
    return surveyResponses;
  }

  updateSurveyStatus(
    surveyResponseId: string,
    requestPayload: SurveyResponseStatus
  ): Observable<any> {
    let loaderMessage = null;
    if (
      requestPayload.completionStatusIdentifier ===
      SurveyConstants.SUBMITTED_COMPLETION_STATUS
    ) {
      loaderMessage = this.translate.instant('content.uploadSurvey');
    } else if (
      requestPayload.completionStatusIdentifier ===
      SurveyConstants.PARTIAL_COMPLETION_STATUS
    ) {
      // if (this.CookieService.get('app_downloaded_for_first_time') == 'YES') {
      //     loaderMessage = this.translate.instant("content.downloadSurvey")
      // } else {
      loaderMessage = this.translate.instant('content.loading');
      // }
    }
    let params = {
      loader: true,
      message: loaderMessage,
    };
    let apiEndpoint = Utility.stringFormat(ApiEndpoints.UPDATE_SURVEY_STATUS, [
      surveyResponseId,
    ]);
    return this.http.post(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      requestPayload,
      { params: params }
    );
  }

  getParamValues(subjectId: string, apiEndpoint: string): Observable<any> {
    apiEndpoint = Utility.stringFormat(apiEndpoint, [subjectId]);
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`
    );
  }

  setHtmlContent(contentPayload: string[], apiEndpoint: string): void {
    apiEndpoint = Utility.stringFormat(apiEndpoint, [
      this.subjectService.loggedInSubject.preferredLanguage,
    ]);
    this.http
      .post<SectionHTMLContent[]>(
        `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
        contentPayload
      )
      .subscribe((result) => {
        this.allStepsHtmlContent.push(...result);
        this.sectionHtmlContentSubject.next(this.allStepsHtmlContent);
      });
  }

  setExternalHtmlContent(contentKey: string, apiEndpoint: string): void {
    this.getExternalHtmlContent(apiEndpoint).subscribe((result) => {
      this.allStepsHtmlContent.push(
        new SectionHTMLContent(contentKey, result.legalStatementText)
      );
      this.sectionHtmlContentSubject.next(this.allStepsHtmlContent);
      this.setLegalStatement(new LegalStatement(result.legalStatementId, true));
    });
  }

  clearHTMlContent(): void {
    this.allStepsHtmlContent = [];
  }

  setSelectedSurvey(form: any): void {
    this.selectedSurvey = form;
  }

  setSelectedSurveySection(section: any): void {
    this.selectedSection = section;
  }

  getSurveySectionConfiguration(sectionInternalId: string): any {
    if (this.configuration) {
      let sectionConf = this.configuration.sections.filter(
        (ob) => ob.identifier === sectionInternalId
      );
      if (sectionConf.length > 0) {
        return sectionConf[0];
      }
    }
    return null;
  }

  getSectionForm(sectionConfiguration: any): FormGroup {
    // Temp code for dev purpose
    if (!this.selectedSection) {
      let tempSelectedSection;
      surveyResponsesFromJson.forEach((el) => {
        tempSelectedSection = el.sectionResponses.filter(
          (ele) =>
            ele.section.internalIdentifier == sectionConfiguration.identifier
        );
      });
      this.selectedSection = tempSelectedSection[0];
    }
    //(sectionConfiguration);
    if (!sectionConfiguration || !this.selectedSection) {
      return null;
    }
    let formGroup: any = {};
    for (let step of sectionConfiguration.steps) {
      if (step.step === 'question') {
        this.setQuestionStepFormControl(step, formGroup);
      } else if (step.step === 'form') {
        this.setFormStepFormControl(step, formGroup);
      }
    }
    let finalFormGroup = new FormGroup(formGroup);
    return finalFormGroup;
  }

  setQuestionStepFormControl(step: any, formGroup: FormGroup): void {
    let loglineRepeatKey = this.getFinalLoglineRepeatKey(step);
    let formGroupKey = `${step.identifier}@${loglineRepeatKey}`;
    let disabled = this.isSurveyReadOnlyMode();
    let defaultValue = this.getDefaultResponse(
      step.identifier,
      loglineRepeatKey
    );
    switch (step.answerFormat.type) {
      case 'multipleValuePicker': {
        this.setMultipleValuePickerFormControl(
          step.answerFormat.valuePickers,
          formGroup,
          loglineRepeatKey
        );
        break;
      }
      case 'textChoice': {
        if (step.answerFormat.style === 'multiple') {
          this.setMultipleTextChoiceFormControl(
            step,
            formGroup,
            loglineRepeatKey
          );
        } else {
          formGroup[formGroupKey] = new FormControl({
            value: defaultValue,
            disabled: disabled,
          });
        }
        break;
      }
      default: {
        // Validations are not there for text choices and multiple value pickers
        let validations: any = this.getFormStepValidations(step);
        formGroup[formGroupKey] = new FormControl(
          { value: defaultValue, disabled: disabled },
          Validators.compose(validations)
        );
      }
    }
  }

  getLogLineRepeatKey(step): number {
    let loglineRepeatKey = null;
    if (step && step.identifier.toLowerCase().includes('_log_')) {
      let decimalNumber = Utility.extractStringValue(step.identifier, '-', 1);
      if (decimalNumber) {
        decimalNumber = Utility.extractStringValue(decimalNumber, '.', 0);
        loglineRepeatKey = +decimalNumber;
      }
    } else if (
      step &&
      Utility.extractKeyValueFromString('order', step.identifier)
    ) {
      loglineRepeatKey = +Utility.extractKeyValueFromString(
        'order',
        step.identifier
      );
    }
    return loglineRepeatKey;
  }

  setFormStepFormControl(step: any, formGroup: FormGroup): void {
    let disabled = this.isSurveyReadOnlyMode();
    for (let item of step.formItems) {
      let loglineRepeatKey = this.getFinalLoglineRepeatKey(item, step);
      // key will be stored in local storage and sent to backend
      let key = item.identifier;
      // form group key is used as key only in angular form object
      let formGroupKey = `${item.identifier}@${loglineRepeatKey}`;
      if (Utility.isRepeatQuestion(item)) {
        key = `${step.identifier}.${key}`;
        formGroupKey = `${step.identifier}.${formGroupKey}`;
      }
      let defaultValue = this.getDefaultResponse(key, loglineRepeatKey);
      switch (item.answerFormat.type) {
        case 'multipleValuePicker': {
          this.setMultipleValuePickerFormControl(
            item.answerFormat.valuePickers,
            formGroup,
            loglineRepeatKey
          );
          break;
        }
        case 'textChoice': {
          if (item.answerFormat.style === 'multiple') {
            this.setMultipleTextChoiceFormControl(
              item,
              formGroup,
              loglineRepeatKey,
              step
            );
          } else {
            formGroup[formGroupKey] = new FormControl({
              value: defaultValue,
              disabled: disabled,
            });
          }
          break;
        }
        default: {
          // Validations are not there for text choices and multiple value pickers
          let validations: any = this.getFormStepValidations(item);
          formGroup[formGroupKey] = new FormControl(
            { value: defaultValue, disabled: disabled },
            Validators.compose(validations)
          );
          break;
        }
      }
    }
  }

  setMultipleValuePickerFormControl(
    valuePickers: any,
    formGroup: FormGroup,
    loglineRepeatKey: number
  ): void {
    let disabled = this.isSurveyReadOnlyMode();
    for (let picker of valuePickers) {
      let formGroupKey = `${picker.identifier}@${loglineRepeatKey}`;
      let defaultValue = this.getDefaultResponse(
        picker.identifier,
        loglineRepeatKey
      );
      formGroup[formGroupKey] = new FormControl({
        value: defaultValue,
        disabled: disabled,
      });
    }
  }

  readSurveyFromJson(
    internalIdentifier: any,
    initiatingEventInterval: any,
    responseOrdinal: any
  ): any {
    let surveys = this.translate.instant('survey');
    let surveyName = surveys[internalIdentifier];
    surveyName = Utility.stringFormat(surveyName, [
      responseOrdinal * initiatingEventInterval,
    ]);
    return surveyName;
  }

  readSectionFromJson(internalIdentifier: any): any {
    let sections = this.translate.instant('sections');
    let sectionName = sections[internalIdentifier];
    return sectionName;
  }

  setMultipleTextChoiceFormControl(
    step: any,
    formGroup: FormGroup,
    loglineRepeatKey: number,
    parentStep: any = null
  ): void {
    // Here we are considering the parent identifier because step id wont be always unique since it is a guid where answer type is multiple choice.
    let disabled = this.isSurveyReadOnlyMode();
    let formGroupKey =
      parentStep && !step.dictionary
        ? `${parentStep.identifier}.${step.identifier}@${loglineRepeatKey}`
        : `${step.identifier}@${loglineRepeatKey}`;
    let formControls = [];
    let selectedAnswers = this.getMultipleChoiceDefaultValues(
      step,
      loglineRepeatKey
    );
    for (let choice of step.answerFormat.textChoices) {
      let selectedAnswer = selectedAnswers.filter(
        (answer) => answer === choice.value
      );
      if (selectedAnswer.length > 0) {
        formControls.push(
          new FormControl({ value: choice.value, disabled: disabled })
        );
      } else {
        formControls.push(new FormControl({ value: '', disabled: disabled }));
      }
    }
    formGroup[formGroupKey] = new FormArray(formControls);
  }

  getFinalLoglineRepeatKey(step: any, parentStep: any = null): number {
    let logLineRepeatKey = this.getLogLineRepeatKey(step);
    // If question does not have logline, then consider the logline of the parent question
    logLineRepeatKey =
      !logLineRepeatKey && parentStep
        ? this.getLogLineRepeatKey(parentStep)
        : logLineRepeatKey;
    // If there is no logline depending on the log attribute, then default is 1.
    logLineRepeatKey = logLineRepeatKey ? logLineRepeatKey : 1;
    return logLineRepeatKey;
  }

  initializeSectionResponseAndProgress(): boolean {
    let initialized: boolean = true;
    if (!this.selectedSection) {
      return initialized;
    }
    let sectionResponseId: string = this.selectedSection.id;
    if (this.configuration.task === 'form') {
      DataStorage.initializeFormSectionResponse(
        sectionResponseId,
        this.selectedSurvey.id
      );
    } else {
      let sectionResponse = DataStorage.getSurveySectionResponseValue(
        this.selectedSection.id,
        this.selectedSurvey.id
      );
      if (
        !sectionResponse ||
        (sectionResponse && sectionResponse.itemDatas.length == 0)
      ) {
        initialized = false;
        DataStorage.initializeSurveySectionResponse(
          this.selectedSection.id,
          this.selectedSurvey.id,
          []
        );
      } else {
        DataStorage.initializeSurveySectionResponse(
          this.selectedSection.id,
          this.selectedSurvey.id,
          sectionResponse.itemDatas
        );
      }
    }
    // Section Progress is used to store the percentage the user has completed and the last visited question Id.
    DataStorage.initializeSectionProgress(
      sectionResponseId,
      this.selectedSurvey.id
    );
    return initialized;
  }

  getMultipleChoiceDefaultValues(
    step: any,
    logLineRepeatKey: number
  ): string[] {
    let selectedAnswers = [];
    for (let textChoice of step.answerFormat.textChoices) {
      let textChoiceLoglineRepeatKey = +Utility.extractKeyValueFromString(
        'order',
        textChoice.value
      );
      logLineRepeatKey = textChoiceLoglineRepeatKey
        ? textChoiceLoglineRepeatKey
        : logLineRepeatKey;
      let stepIdentifier = step.dictionary ? step.identifier : textChoice.value; // In multiple choice, value is stored as the itemOID if the value is not a codelist
      let defaultValue = this.getDefaultResponse(
        stepIdentifier,
        logLineRepeatKey
      );
      if (defaultValue.toLowerCase() === 'yes') {
        selectedAnswers.push(textChoice.value);
      }
    }
    return selectedAnswers;
  }

  getDefaultResponse(stepIdentifier: string, logLineRepeatKey: number): string {
    let sectionResponseId = this.selectedSection.id;
    // Temprory Logic for iFrame
    if(!this.selectedSurvey){
      let finalSurveyIndex;
      surveyResponsesFromJson.forEach((el,index)=>{
        console.log(el.sectionResponses)
        let surveyIndex = el.sectionResponses.findIndex(ele => ele.id == sectionResponseId)
        console.log(surveyIndex)
        if(surveyIndex>=0){
          finalSurveyIndex = index;
        }
      })
      this.selectedSurvey = surveyResponsesFromJson[finalSurveyIndex]
    }
    let responseValue: string = null;
    if (this.configuration.task === 'form') {
      responseValue = DataStorage.getFormQuestionResponse(
        sectionResponseId,
        stepIdentifier,
        this.selectedSurvey.id
      );
    } else {
      let response = DataStorage.getSurveyQuestionResponse(
        sectionResponseId,
        stepIdentifier,
        this.selectedSurvey.id,
        logLineRepeatKey
      );
      responseValue = response ? response.value : null;
    }
    return responseValue ? responseValue : '';
  }

  getFormStepValidations(step: any): any {
    let validations: any = [];
    if (step.answerFormat.validationRegex) {
      this.addRegexValidation(validations, step.answerFormat.validationRegex);
    }
    if (step.answerFormat.maximumLength) {
      this.addMaximumLengthValidation(
        validations,
        step.answerFormat.maximumLength
      );
    }
    if (step.answerFormat.minimumLength) {
      this.addMinimumLengthValidation(
        validations,
        step.answerFormat.minimumLength
      );
    }
    if (step.answerFormat.minimumDate) {
      this.addMinimumDateValidation(validations, step.answerFormat.minimumDate);
    }
    if (step.answerFormat.maximumDate) {
      this.addMaximumDateValidation(validations, step.answerFormat.maximumDate);
    }
    return validations;
  }

  addRegexValidation(validations: any, value: string): void {
    validations.push(Validators.pattern(value));
  }

  addMaximumLengthValidation(validations: any, value: number): void {
    validations.push(Validators.maxLength(value));
  }

  addMinimumLengthValidation(validations: any, value: number): void {
    validations.push(Validators.minLength(value));
  }

  addMinimumDateValidation(validations: any, value: string): void {
    validations.push(CustomValidators.dateMinimum(value));
  }

  addMaximumDateValidation(validations: any, value: string): void {
    if (value === 'today') {
      validations.push(CustomValidators.dateMaximum());
    } else {
      validations.push(CustomValidators.dateMaximum(value));
    }
  }

  submitQuestionResponse(
    data: SurveySectionResponseItemData[],
    progressPercentage: number
  ): void {
    let surveyResponse: SurveyCompletion = new SurveyCompletion(
      'N of 1 Mobile',
      this.subjectService.loggedInSubject.subjectId,
      this.subjectService.loggedInSubject.subjectIdentifier,
      'FOP Registry',
      'EPRO-NOVI-1',
      '24',
      this.subjectService.loggedInSubject.username,
      []
    );
    let responseSections = {
      sections: [],
    };
    let sectionData = new SectionCompletion(this.selectedSection.id, data);
    responseSections.sections.push(sectionData);
    surveyResponse.surveyResponse.push(responseSections);
    let requestPayload = {
      sectionResponseDetails: JSON.stringify([surveyResponse]),
      sectionProgressCompleted: progressPercentage,
    };
    // //(requestPayload)
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.SUBMIT_QUESTION_RESPONSE,
      [this.selectedSurvey.id, this.selectedSection.id]
    );
    this.http
      .post(
        `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
        requestPayload
      )
      .subscribe({
        complete: () => console.log('Response Submitted!!'),
      });
  }

  getSurveyExpiryDays(closeDate: string): number {
    let expiryDate = new Date(closeDate);
    let todayDate = new Date(new Date().toISOString());
    let diffInTime = expiryDate.getTime() - todayDate.getTime();
    let diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  }

  updateSurveySectionStatus(
    requestPayload: any,
    sectionId: string
  ): Observable<any> {
    // let apiEndpoint = Utility.stringFormat(ApiEndpoints.UPDATE_SECTION_STATUS, [sectionId])
    // return this.http.post(`${this.appConfig.configuration.baseUrl}${apiEndpoint}`, requestPayload)
    return null;
  }

  updateSubjectLanguage(
    subjectId: string,
    personId: string,
    preferredLanguage: string
  ): Observable<any> {
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.UPDATE_SUBJECT_LANGUAGE,
      [subjectId, personId, preferredLanguage]
    );
    return this.http.post(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      null
    );
  }

  getSignatureDetails(): Observable<any> {
    return this.http.get<any>(
      `${this.appConfig.configuration.baseUrl}${ApiEndpoints.GET_SIGNATURE_DETAILS}`
    );
  }

  onCompleteRegistration(): void {
    let response = DataStorage.getFormResponse(
      this.selectedSection.id,
      this.selectedSurvey.id
    );
    if (
      response.OrganizationId &&
      response.OrganizationId !== '' &&
      !this.defaultStudySiteId
    ) {
      this.getOrganizationStudySites(response.OrganizationId).subscribe(
        (result) => {
          let defaultStudySiteId = result[0].id;
          response['StudySiteId'] = defaultStudySiteId;
          let requestPayload = this.transformPayload(response);
          this.submitRegistrationForm(requestPayload);
        }
      );
    } else {
      response['StudySiteId'] =
        response.OrganizationId !== '' && this.defaultStudySiteId
          ? this.defaultStudySiteId
          : null;
      let requestPayload = this.transformPayload(response);
      this.submitRegistrationForm(requestPayload);
    }
  }

  transformPayload(response: any): any {
    response = this.deleteNullValuesFromResponse(response);
    response['$type'] =
      'Nof1Health.Api.ViewModels.Subject.PersonSubjectViewModel, Nof1Health.Api';
    response['StatementAgreementViewModels'] = this.legalStatement;
    if (response.DateOfBirth) {
      let dateOfBirth = new Date(response.DateOfBirth);
      response['DateOfBirthDay'] = dateOfBirth.getUTCDate();
      response['DateOfBirthMonth'] = dateOfBirth.getUTCMonth() + 1; // Months from 1-12
      response['DateOfBirthYear'] = dateOfBirth.getUTCFullYear();
    }
    return response;
  }

  deleteNullValuesFromResponse(response: any): any {
    Object.keys(response).forEach((key) => {
      if (response[key] === null || response[key] === '') {
        delete response[key];
      }
    });
    return response;
  }

  submitRegistrationForm(requestPayload: any): void {
    this.http
      .post(
        `${this.appConfig.configuration.baseUrl}${ApiEndpoints.REGISTRATION_SUBMIT}`,
        requestPayload
      )
      .subscribe({
        complete: () => this.registrationCompletedSubject.next(true),
      });
  }

  getExternalHtmlContent(apiEndpoint: string): any {
    apiEndpoint = Utility.stringFormat(apiEndpoint, [
      this.subjectService.loggedInSubject.preferredLanguage,
    ]);
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`
    );
  }

  fetchSurveySectionResponses(): Observable<any> {
    let params = {
      loader: true,
      message: '',
    };
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.FETCH_SECTION_RESPONSES,
      [this.selectedSection.id]
    );
    return this.http.get(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      { params: params }
    );
  }

  public getFormInputModel(
    question: any,
    form: FormGroup,
    parentQuestion: any = null
  ): FormInput {
    return new FormInput(question, form, parentQuestion);
  }

  public getSurveySectionCompletionStatus(sectionResponseId: string): string {
    let surveyStatus: string = '';
    if (!this.selectedSurvey) {
      return surveyStatus;
    }
    let sectionResponse = this.selectedSurvey.sectionResponses.filter(
      (ob) => ob.id === sectionResponseId
    );
    if (sectionResponse.length > 0) {
      surveyStatus = sectionResponse[0].completionStatus
        ? sectionResponse[0].completionStatus.internalIdentifier
        : '';
    }
    return surveyStatus;
  }
  getSubjectDetails(subjectId: string): Observable<SubjectProfile> {
    let params = {
      loader: true,
      message: '',
    };
    let apiEndpoint = Utility.stringFormat(
      ApiEndpoints.GET_SUBJECT_PROFILE_DETAILS,
      [subjectId]
    );
    return this.http.get<SubjectProfile>(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      { params: params }
    );
  }

  uploadSurveyData(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', file, file.name);
    formData.append(
      'SubjectIdentifier',
      this.subjectService.loggedInSubject.subjectIdentifier
    );
    let apiEndpoint = Utility.stringFormat(ApiEndpoints.UPLOAD_SURVEY_DATA, [
      this.selectedSection.id,
    ]);
    return this.http.post(
      `${this.appConfig.configuration.baseUrl}${apiEndpoint}`,
      formData,
      { responseType: 'text' }
    );
  }
}
