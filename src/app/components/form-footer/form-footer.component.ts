import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { FormService } from 'src/app/services/form.service';
import { NavigationEnd, Router, ActivatedRoute } from '@angular/router';
import { SectionResponse } from 'src/app/models/section-response.model';
import { SectionResponseProgress } from 'src/app/models/section-response-progress.model';
import { SurveyResponseStatus } from '../../models/survey-response-status.model';
import { SurveyConstants } from 'src/app/constants/survey-constants.enum';
import { SubjectService } from 'src/app/services/subject.service';
import { DataStorage } from 'src/app/utility/storage';
import { TranslateService } from '@ngx-translate/core';

declare const scrollToTop;
@Component({
  selector: 'app-form-footer',
  templateUrl: './form-footer.component.html',
  styleUrls: ['./form-footer.component.scss']
})
export class FormFooterComponent implements OnInit {

  constructor(private formStepNavigatorService: FormStepNavigator,
    private formService: FormService,
    private location: Location,
    private router: Router,
    private subjectService: SubjectService,
    private route: ActivatedRoute, public translate: TranslateService
  ) { }


  surveyInternalId: string;
  scrolledTillBottom: boolean = false
  hyperlinkClicked: boolean = false
  questionIndex: number = 0
  surveyStarted: boolean = false
  routeUrl: string = ""
  displayModalStyle: string = "none"
  displayLoadingModalStyle: string = "none"
  displayActionModal: string = "none"
  displayeConsentModal: string = 'none'

  scroll() {
    scrollToTop();
  }

  ngOnInit(): void {
    this.surveyInternalId = this.route.snapshot.paramMap.get('surveyInternalId')
    this.router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        this.routeUrl = value.url
      }
    })
    this.formStepNavigatorService.hyperLinkClickedSubject.subscribe(isLinkClicked => {
      this.hyperlinkClicked = isLinkClicked
    })
    this.formStepNavigatorService.questionIndexSubject.subscribe(questionIndex => {
      this.questionIndex = questionIndex
      this.scrolledTillBottom = false // Reset the value when question index has changed
    })
    this.formStepNavigatorService.surveyStartedSubject.subscribe(surveyStarted => {
      this.surveyStarted = surveyStarted // If survey has started, then show next button
    })
    this.formService.registrationCompletedSubject.subscribe(completed => {
      if (completed) {
        this.displayLoadingModalStyle = "none"
        this.formStepNavigatorService.onNext()
      }
    })
  }


  getSubmitButtonTitle(): string {
    let buttonTitle = this.translate.instant("content.submitButton")
    if (this.formService.eSignatureRequiredForSurvey(this.formService.selectedSurvey.id)) {
      buttonTitle = this.translate.instant("content.signSubmit")
    }
    return buttonTitle
  }

  showSubmitButton(): boolean {
    return !this.formService.isSurveyReadOnlyMode() && (this.isSectionListingScreen() || this.showSubmitOnLastSectionStep())
  }

  isSectionListingScreen(): boolean {
    return !this.surveyStarted && this.routeUrl.includes('/sections')
  }

  showSubmitOnLastSectionStep(): boolean {
    return this.formStepNavigatorService.isLastStep() && this.isLastSection()
  }


  showNextSurveySectionButton(): boolean {
    return !this.isLastSection() && this.formStepNavigatorService.isLastStep() && !this.formStepNavigatorService.isRegistrationForm()
  }

  isLastSection(): boolean {
    let currentSection: SectionResponse = this.formService.selectedSection
    return currentSection && currentSection.ordinal === this.getMaxSectionOrdinal()
  }

  getMaxSectionOrdinal(): number {
    let maxOrdinal: number = -1
    if (!this.formService.selectedSurvey.sectionResponses) {
      return maxOrdinal
    }
    this.formService.selectedSurvey.sectionResponses.map(ob => {
      if (ob.ordinal > maxOrdinal) {
        maxOrdinal = ob.ordinal
      }
    })
    return maxOrdinal
  }

  allSectionsCompleted(): boolean {
    if (this.formService.selectedSurvey && this.formService.selectedSurvey.sectionResponses) {
      let sections: SectionResponse[] = this.formService.selectedSurvey.sectionResponses
      let allSectionsCompleted: boolean = true
      for (let section of sections) {
        let sectionProgress: SectionResponseProgress = DataStorage.getSectionProgress(section.id, this.formService.selectedSurvey.id)
        if (!this.isSectionCompleted(section, sectionProgress)) {
          allSectionsCompleted = false
          break
        }
      }
      return allSectionsCompleted
    }
    return false
  }

  sectionHasExternalHtmlContent(): boolean {
    let currentStep = this.formStepNavigatorService.getCurrentStep()
    let hasCustomHtmlSection: boolean = false
    if (this.formStepNavigatorService.hasNestedSections(currentStep)) {
      // In case of consent review, the content will always show on the same screen and incase of visual consent, the content will always be shown on click of link
      if (currentStep.step === 'consentReview') {
        hasCustomHtmlSection = true
      }
    }
    return hasCustomHtmlSection
  }

  onNext(): void {
    if (!this.formStepNavigatorService.isCurrentStepValidResponse()) {
      return
    }
    this.formStepNavigatorService.resetResponseValidityForQuestion()
    // This condition is for enrolling the participant in the registry
    if (this.formStepNavigatorService.getCurrentStep().waitAlert &&
      this.formStepNavigatorService.getCurrentStep().waitAlert.type.toLowerCase() === "submit"
    ) {
      this.displayLoadingModalStyle = "block"
      this.formService.onCompleteRegistration();
    } else {
      this.formStepNavigatorService.onNext()
    }
  }


  getLoadingMessage(): string {
    return this.formStepNavigatorService.getCurrentStep() &&
      this.formStepNavigatorService.getCurrentStep().waitAlert ?
      this.formStepNavigatorService.getCurrentStep().waitAlert.loadingMessage :
      ""
  }


  @HostListener("window:scroll", [])
  scrolledToBottom(): void {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      this.scrolledTillBottom = true
    } else {
      this.scrolledTillBottom = false
    }
  }

  disableNext(): boolean {
    let currentStep: any = this.formStepNavigatorService.getCurrentStep()
    let disableNext: boolean = false
    if (currentStep.requiresScrollToBottom) {
      disableNext = !this.scrolledTillBottom  // If scrolled till bottom is true, then button should not be disabled
    }
    if (((currentStep.isOptional === false && !this.formStepNavigatorService.isQuestionAnswered()) || !this.areAllMandatoryQuestionsAnswered(currentStep)) && !this.formService.isSurveyReadOnlyMode()) {
      disableNext = true
    }
    return false
  }

  // If the parent question is optional, but child questions are mandatory, it means 
  // if one mandatory question is answered then other mandatory questions also need to be
  // answered. (i.e. either all mandatory child questions need to be answered or none of them)
  areAllMandatoryQuestionsAnswered(currentStep: any): boolean {
    let allQuestionsAnswered: boolean = true
    if (currentStep.isOptional == true && currentStep.step == "form") {
      let mandatoryChildQuestions = currentStep.formItems.filter(ob => ob.isOptional == false)
      if (mandatoryChildQuestions.length > 1) {
        // Either all mandatory child questions must be answered or none of them must be answered
        allQuestionsAnswered = this.formStepNavigatorService.areAllQuestionsAnswered(mandatoryChildQuestions) || this.formStepNavigatorService.areAllQuestionsNotAnswered(mandatoryChildQuestions)
      }
    }
    return allQuestionsAnswered
  }

  getContinueButtonTitle(): string {
    let currentStep: any = this.formStepNavigatorService.getCurrentStep()
    if (this.formStepNavigatorService.isVisualStep(currentStep)) {
      currentStep = this.formStepNavigatorService.getCurrentChildStep()
    }
    return currentStep.continueButtonTitle ? currentStep.continueButtonTitle : this.translate.instant("content.nextButton")
  }

  isLastStep(): boolean {
    if (this.formStepNavigatorService.sectionConfiguration) {
      return this.questionIndex === this.formStepNavigatorService.sectionConfiguration.steps.length - 1 // Show Done button and hide next and skip buttons on last step
    }
    return false
  }

  onESignatureCancelled(): void {
    this.displayeConsentModal = "none"
  }


  onSubmitSurveyClicked(): void {
    if (this.formService.eSignatureRequiredForSurvey(this.formService.selectedSurvey.id)) {
      // When survey needs a eSignature set the survey status to partial not signed
      // The backend will also create a record in signature table with status as pending
      let updateSurveyStatusRequestPayload: SurveyResponseStatus = new SurveyResponseStatus(
        this.formService.selectedSurvey.id,
        SurveyConstants.PARTIAL_NOT_SIGNED_COMPLETION_STATUS,
        SurveyConstants.SURVEY_MEDIUM_MOBILE
      )
      // After updating survey status, show eConsent popup
      this.formService.updateSurveyStatus(this.formService.selectedSurvey.id, updateSurveyStatusRequestPayload).subscribe(result => {
        this.displayeConsentModal = "block"
      })
      this.displayeConsentModal = "block"
    } else {
      this.displayActionModal = "block";
    }
  }

  onCancelSubmitSurvey(): void {
    this.displayActionModal = "none"
  }

  getSubmitSurveyInfo(): string {
    return `<span>${this.translate.instant('content.submitMessage')}</span> <br></br> <span>${this.translate.instant('content.continueButton')}</span>`
  }

  onESigntatureCompleted(): void {
    this.displayeConsentModal = "none"
    this.onSubmitSurvey()
  }

  onSubmitSurvey(): void {
    let updateSurveyStatusRequestPayload: SurveyResponseStatus = new SurveyResponseStatus(
      this.formService.selectedSurvey.id,
      SurveyConstants.SUBMITTED_COMPLETION_STATUS,
      SurveyConstants.SURVEY_MEDIUM_MOBILE
    )
    // On Success, show another success modal
    this.formService.updateSurveyStatus(this.formService.selectedSurvey.id, updateSurveyStatusRequestPayload).subscribe({
      complete: () => {
        this.displayModalStyle = "block"
        this.displayActionModal = "none"
      }
    })
  }


  onSurveyCompleted(): void {
    // Redirect to list survey page
    this.displayModalStyle = "none"
    DataStorage.clearSurveyData(this.formService.selectedSurvey.id)
    this.formStepNavigatorService.surveyStartedSubject.next(false)
    this.formStepNavigatorService.resetAllIndexes()
    this.router.navigate([''])
  }


  onNextSectionClick(): void {
    this.formStepNavigatorService.resetAllIndexes()
    // Reset all the indexes and set percentage to 100 in local storage
    DataStorage.setSectionProgressPercentageOnCompletion(this.formService.selectedSection.id, this.formService.selectedSurvey.id)
    this.setImmediateNextSection()
  }

  // If the current section is not the last section, then the user will be taken to the immediate next section.
  setImmediateNextSection(): void {
    let nextSection = this.formService.selectedSurvey.sectionResponses.filter(ob => ob.ordinal === this.getNextSurveySectionOrdinal())[0]
    if (nextSection) {
      this.formService.setSelectedSurveySection(nextSection)
      this.formStepNavigatorService.resetAllIndexes()
      this.router.navigate(['/form', this.formService.selectedSurvey.survey.internalIdentifier, nextSection.section.internalIdentifier], { replaceUrl: true })
    }
  }

  // Get the immediate next section ordinal
  getNextSurveySectionOrdinal(): number {
    let nextSectionOrdinal: number = -1
    let currentSection = this.formService.selectedSection
    for (let sectionResponse of this.formService.selectedSurvey.sectionResponses) {
      if (sectionResponse.ordinal > currentSection.ordinal) {
        nextSectionOrdinal = sectionResponse.ordinal
        break
      }
    }
    return nextSectionOrdinal
  }

  isSectionCompleted(sectionResponse: SectionResponse, sectionProgress: SectionResponseProgress): boolean {
    let sectionCompleted: boolean = false
    if ((sectionProgress && sectionProgress.progressPercentage >= 100) ||
      (sectionResponse.completionStatus && sectionResponse.completionStatus.internalIdentifier === SurveyConstants.COMPLETED_COMPLETION_STATUS)
    ) {
      sectionCompleted = true
    }
    return sectionCompleted
  }

}
