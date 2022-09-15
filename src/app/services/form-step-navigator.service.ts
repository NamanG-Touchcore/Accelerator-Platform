import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ReplaySubject , Subject} from "rxjs";
import { SurveySectionResponseItemData } from "../models/survey-section-response-item-data.model";
import { Utility } from "../utility/utility";
import { FormService } from "./form.service";
import { SectionResponseProgress } from "../models/section-response-progress.model"
import { SubjectService } from "./subject.service";
import { DataStorage } from "../utility/storage";
import { SurveyConstants } from "../constants/survey-constants.enum";
import { FormInput } from "../models/form-input.model";

@Injectable({ providedIn: 'root' })
export class FormStepNavigator {

    constructor(private formService: FormService, private subjectService: SubjectService) { }
    childQuestionIndex: number = 0
    questionIndex: number = 0
    sectionConfiguration: any
    form: FormGroup;
    paramValues: any = null
    progressPercent: number = 0
    stepInterval: number = 0
    responseValidity: any = {}

    surveyStartedSubject = new ReplaySubject<boolean>(1)
    questionIndexSubject = new ReplaySubject<number>(1);
    childQuestionIndexSubject = new ReplaySubject<number>(1);
    hyperLinkClickedSubject = new ReplaySubject<boolean>(1);
    hyperLinkClickedStepSubject = new ReplaySubject<any>(1); // This will  emit the step when user clicks on hyperlink in any step
    progressSubject = new ReplaySubject<number>();  // Calculate the progress percentage and send to progress bar component.
    stepsUpdateSubject = new Subject<any>();

    //  Reset all indexes, on completion of section and click on cancel.
    resetAllIndexes(): void {
        this.questionIndex = 0
        this.childQuestionIndex = 0
        this.questionIndexSubject.next(0)
        this.childQuestionIndexSubject.next(0)
    }

    getTotalStepCount(): number {
        let count = this.sectionConfiguration.steps.length
        // console.log(this.sectionConfiguration)
        for (let step of this.sectionConfiguration.steps) {
            if (this.isVisualStep(step)) {
                count += step.document.sections.length
            }
        }
        return count
    }

    getNestedStepCount(startIndex: number, endIndex: number): number {
        let count = 0
        for (let index = startIndex; index < endIndex; index++) {
            if (this.isVisualStep(this.sectionConfiguration.steps[index])) {
                count += this.sectionConfiguration.steps[index].document.sections.length
            }
        }
        return count
    }

    setAllIndexesAndProgress(): void {
        let stepCount = this.getTotalStepCount()
        this.stepInterval = 100 / stepCount // Total percentage will be always considered as 100
        // If the survey is registration or in read only mode, then always start from the beginning
        if (this.isRegistrationForm() || this.formService.isSurveyReadOnlyMode())
            return

        let sectionProgress: SectionResponseProgress = DataStorage.getSectionProgress(this.formService.selectedSection.id, this.formService.selectedSurvey.id)
        if (sectionProgress.lastVisitedQuestionId) {
            this.questionIndex = this.getStepIndex(sectionProgress.lastVisitedQuestionId)
            this.questionIndexSubject.next(this.questionIndex)
            // If progress percentage is 100 and question index is 0, it means the section response is submitted once successfully.
            this.progressPercent = (sectionProgress.progressPercentage === 0 || (sectionProgress.progressPercentage === 100 && this.questionIndex === 0)) ? this.stepInterval : sectionProgress.progressPercentage
            this.progressSubject.next(this.progressPercent)
        } else {
            // If last visited question is not present in local storage, then calculate it on responses
            let questionIndex = this.getLastVisitedStepIndex()
            if (questionIndex !== -1) {
                this.questionIndex = questionIndex
                this.questionIndexSubject.next(this.questionIndex)
                this.calculateParentQuestionProgressPercentage()
            } else {
                this.progressPercent = this.stepInterval
                this.progressSubject.next(this.progressPercent)
            }
        }
    }

    getLastVisitedQuestionIdFromResponses(): string {
        let sectionResponse = DataStorage.getSurveySectionResponseValue(this.formService.selectedSection.id, this.formService.selectedSurvey.id)
        if (sectionResponse.itemDatas.length == 0) {
            return null
        }
        // Sort by datetimestamp in descending order
        let sortedResponses = sectionResponse.itemDatas.sort((a, b) => new Date(b.dateTimeStamp).getTime() - new Date(a.dateTimeStamp).getTime());
        let lastVisitedResponse = sortedResponses[0]
        let lastVisitedQuestionId = this.getLastVisitedQuestionId(lastVisitedResponse.itemOID)
        return lastVisitedQuestionId
    }

    getLastVisitedQuestionId(itemOID: string): string {
        let parentQuestionId = itemOID
        for (let step of this.sectionConfiguration.steps) {
            if (step.step == "question") {
                if (this.itemOIDExists(step, itemOID)) {
                    parentQuestionId = step.identifier
                    break
                }
            } else if (step.step == "form") {
                for (let formItem of step.formItems) {
                    if (this.itemOIDExists(formItem, itemOID)) {
                        parentQuestionId = step.identifier
                        break
                    }
                }
            }
        }
        return parentQuestionId
    }

    itemOIDExists(step: any, itemOID: string): boolean {
        let itemOIDExists: boolean = false
        if (step.identifier === itemOID) {
            itemOIDExists = true
        }
        else if (step.answerFormat.style === "multiple") {
            let childId = step.answerFormat.textChoices.filter(ob => ob.value === itemOID)[0]
            if (childId) {
                itemOIDExists = true
            }
        } else if (step.answerFormat.type === "multipleValuePicker") {
            let childId = step.answerFormat.valuePickers.filter(ob => ob.identifier === itemOID)[0]
            if (childId) {
                itemOIDExists = true
            }
        }
        return itemOIDExists
    }




    saveConfigurationAndForm(section: any, form: FormGroup): void {
        this.surveyStartedSubject.next(true) // Show cancel button and the navigation buttons when the form survey is rendered
        this.sectionConfiguration = section
        this.form = form
    }

    saveParamValues(paramValues: any): void {
        this.paramValues = paramValues
        let displayTextParam = this.getParamActionDisplayText()
        if (displayTextParam) {
            this.setDisplayText(displayTextParam, this.getCurrentStep())
        }
    }

    getParamActionDisplayText(): any {
        let currentStep = this.getCurrentStep()
        if (currentStep && currentStep.params) {
            let nextStepActionParam = currentStep.params.filter(ob => ob.action === 'displayText')
            if (nextStepActionParam.length > 0) {
                return nextStepActionParam
            }
        }
        return null
    }

    questionChanged(): void {
        // If question is of type visual consent, then calculation is different.
        if (!this.isVisualStep(this.getCurrentStep())) {
            this.calculateParentQuestionProgressPercentage()
        } else {
            this.calculateIndependentChildQuestionProgressPercentage()
        }
        this.questionIndexSubject.next(this.questionIndex)
    }

    calculateParentQuestionProgressPercentage(): void {
        let nestedStepCount = this.getNestedStepCount(0, this.questionIndex)
        this.progressPercent = this.stepInterval * (this.questionIndex + nestedStepCount + 1)
        this.progressSubject.next(this.progressPercent)
        DataStorage.setSectionProgress(this.formService.selectedSection.id, this.sectionConfiguration.steps[this.questionIndex].identifier, this.progressPercent, this.formService.selectedSurvey.id)
    }

    calculateIndependentChildQuestionProgressPercentage(): void {
        let nestedStepCount = this.getNestedStepCount(0, this.questionIndex)
        this.progressPercent = (this.questionIndex + this.childQuestionIndex + nestedStepCount + 1) * this.stepInterval
        this.progressSubject.next(this.progressPercent)
        DataStorage.setSectionProgress(this.formService.selectedSection.id, this.sectionConfiguration.steps[this.questionIndex].identifier, this.progressPercent, this.formService.selectedSurvey.id)
    }

    childQuestionChanged(): void {
        this.childQuestionIndexSubject.next(this.childQuestionIndex)
        this.calculateIndependentChildQuestionProgressPercentage()
    }

    setInitialHtmlContent(): void {
        if (this.hasNestedSections(this.getCurrentStep())) {
            this.setHTMLContent(this.getCurrentStep())
        }
    }

    getCurrentStep(): any {
        return this.sectionConfiguration ? this.sectionConfiguration.steps[this.questionIndex] : null
    }

    getImmediatePreviousStep(step: any): any {
        let index = this.getStepIndex(step.identifier)
        let previousIndex = index - 1
        return this.sectionConfiguration.steps[previousIndex]
    }

    getCurrentChildStep(): any {
        if (this.isVisualStep(this.getCurrentStep())) {
            return this.getCurrentStep().document.sections[this.childQuestionIndex]
        }
        return null
    }

    setResponseValidity(questionId: string, isValid: boolean): void {
        this.responseValidity[questionId] = isValid
    }

    resetResponseValidityForQuestion(): void {
        let currentStep = this.getCurrentStep()
        if (currentStep.step === "form") {
            // delete all valid nested formItems identifier from response validity
            for (let item of currentStep.formItems) {
                if (this.responseValidity[item.identifier] === true) {
                    delete this.responseValidity[item.identifier]
                }
            }
        } else if (this.responseValidity[currentStep.identifier] === true) {
            delete this.responseValidity[currentStep.identifier]
        }
    }

    resetResponseValidity(): void {
        this.responseValidity = {}
    }

    onPrev(): void {
        if (this.childQuestionIndex !== 0) {
            this.childQuestionIndex--
            this.childQuestionChanged()
        } else {
            this.navigateToPreviousParentQuestion()
        }
        let displayTextParam = this.getParamActionDisplayText()
        if (displayTextParam) {
            this.setDisplayText(displayTextParam, this.getCurrentStep())
        }
    }

    navigateToPreviousParentQuestion(): void {
        let currentStep = this.getCurrentStep()
        let previousStepFound: boolean = false
        // Show previous step based on predicate logic
        if (currentStep.predicateParentIdentifiers && !previousStepFound) {
            let predicateResults = this.checkPredicateResultSteps(currentStep)
            if (predicateResults.found && predicateResults.previousStep) {
                previousStepFound = true
                this.changeStep(predicateResults.previousStep)
            }
        }
        // Show previous step based on direct navigation logic
        if (currentStep.directNavigationParentIdentifiers && !previousStepFound) {
            let directStepResults = this.checkDirectNavigationSteps(currentStep)
            if (directStepResults.found && directStepResults.previousStep) {
                previousStepFound = true
                this.changeStep(directStepResults.previousStep)
            }
        }
        // Show previous step based on default step logic
        if (currentStep.defaultStepParentIdentifiers && !previousStepFound) {
            let defaultStepResults = this.checkDefaultSteps(currentStep)
            if (defaultStepResults.found && defaultStepResults.previousStep) {
                previousStepFound = true
                this.changeStep(defaultStepResults.previousStep)
            }
        }
        // If none of the above conditions satisfy, then render the next immediate previous step
        if (!previousStepFound) {
            this.renderImmediatePreviousStep(currentStep)
        }
        if (this.isVisualStep(this.getCurrentStep())) {
            this.childQuestionIndex = this.getCurrentStep().document.sections.length - 1
            this.childQuestionChanged()
        }
        // If the step has document sections (consentReview or visualConsent) step
        if (this.hasNestedSections(this.getCurrentStep())) {
            this.setHTMLContent(this.getCurrentStep())
        }
    }

    renderImmediatePreviousStep(step: any): void {
        let previousStep = this.getImmediatePreviousStep(step)
        // If immediate previous step is a parent question, then render that step
        // if ((!previousStep.predicateParentIdentifiers || previousStep.predicateParentIdentifiers.length === 0) && this.showStepBasedOnParam(previousStep)) {
        //     this.changeStep(previousStep)
        // } else {
            // If previous step has predicate parent ids and predicate rules are not satisfied
            // then call the function recursively
            if (previousStep.predicateParentIdentifiers && !this.checkPredicateResultSteps(previousStep).found) {
                this.renderImmediatePreviousStep(previousStep)
            }
            // else if (!this.showStepBasedOnParam(previousStep)) {  // If the step should not be shown as per the param value
            //     // then call the function recursively
            //     this.renderImmediatePreviousStep(previousStep)
            // }
            else {
                // Get the next index idependent question.
                let finalNextIndependentIndex = this.getFinalNextIndependentQuestionIndex(previousStep)
                if (finalNextIndependentIndex !== -1) {
                    previousStep = this.sectionConfiguration.steps[finalNextIndependentIndex]
                }
                this.changeStep(previousStep)
            }
        // }
    }

    getFinalNextIndependentQuestionIndex(step: any): number {
        let finalNextIndependentQuestionIndex: number = -1
        let nextIndependentIndex = this.getNextIndependentQuestionIndex(step)
        while (nextIndependentIndex !== -1 && nextIndependentIndex < this.questionIndex) {
            finalNextIndependentQuestionIndex = nextIndependentIndex
            let nextIndependentStep = this.sectionConfiguration.steps[nextIndependentIndex]
            // Update the predicate visibility of the next independent question
            let nextVisibileIndex = this.updatePredicateStepsVisibilityForStep(nextIndependentStep)
            if (nextVisibileIndex !== -1 && nextVisibileIndex < this.questionIndex) {
                let nextVisibleStep = this.sectionConfiguration.steps[nextVisibileIndex]
                finalNextIndependentQuestionIndex = nextVisibileIndex
                // Again get the next independent question, according to the child step which satisfied the
                // predicate results
                nextIndependentIndex = this.getNextIndependentQuestionIndex(nextVisibleStep)
            }
            else {
                // If there is no child step that needs to be rendered as per the predicate logic,
                // then break the execution
                break
            }
        }
        return finalNextIndependentQuestionIndex
    }

    getStepIndex(stepIdentifier: string): number {
        return this.sectionConfiguration.steps.findIndex(ob => ob.identifier === stepIdentifier)
    }

    getLastVisitedStepIndex(): number {
        let lastVisitedQuestionId = this.getLastVisitedQuestionIdFromResponses()
        if (!lastVisitedQuestionId)
            return -1
        let lastVisitedStep = this.sectionConfiguration.steps.filter(ob => {
            // Here question and form cases are checked explicitly because the itemOID stored in
            // the backend is at the formItem level in case of form
            switch (ob.step) {
                case "question": {
                    if (ob.identifier.includes(lastVisitedQuestionId)) {
                        return ob
                    }
                    break
                }
                case "form": {
                    let formItem = ob.formItems.filter(formItem => {
                        if (formItem.identifier.includes(lastVisitedQuestionId)) {
                            return formItem
                        }
                    })[0]
                    if (formItem)
                        return ob
                    break
                }
            }
        })[0]
        if (!lastVisitedStep)
            return -1
        return this.sectionConfiguration.steps.findIndex(ob => ob.identifier == lastVisitedStep.identifier)
    }

    changeStep(step: any): void {
        this.questionIndex = this.getStepIndex(step.identifier)
        this.questionChanged()
    }

    checkDirectNavigationSteps(step: any): any {
        let directStepFound: boolean = false
        let previousStep: any = null
        for (let directStepId of step.directNavigationParentIdentifiers) {
            let directStepIndex = this.getStepIndex(directStepId)
            let directStep = this.getStepById(directStepId)
            // Check if the direct step has to be shown as per the predicate rule
            if (directStep.predicateParentIdentifiers) {
                if (this.checkPredicateResultSteps(directStep).found) {
                    previousStep = JSON.parse(JSON.stringify(directStep))
                    directStepFound = true
                    break
                }
            }
            // else if (this.showStepBasedOnParam(directStep)) { // If direct step is not shown as per predicate rule then check the param value
            //     // If the index is less than the current index (since it is previous navigation), then show the step
            //     if (directStepIndex < this.questionIndex) {
            //         previousStep = JSON.parse(JSON.stringify(directStep))
            //         directStepFound = true
            //         break
            //     }
            // }
        }
        return {
            found: directStepFound,
            previousStep: previousStep
        }
    }

    checkDefaultSteps(step: any): any {
        let defaultStepFound: boolean = false
        let previousStep: any = null
        for (let defaultStepId of step.defaultStepParentIdentifiers) {
            let defaultStep = this.getStepById(defaultStepId)
            // Check if the predicate rule is satisfied, if the default step is shown according
            // to the predicate rule.
            if (defaultStep.predicateParentIdentifiers) {
                if (this.checkPredicateResultSteps(defaultStep).found) {
                    previousStep = JSON.parse(JSON.stringify(defaultStep))
                    defaultStepFound = true
                    break
                }
            }
            // else if (this.showStepBasedOnParam(defaultStep)) { //If default step is not shown as per predicate rule then check the param value
            //     previousStep = JSON.parse(JSON.stringify(defaultStep))
            //     defaultStepFound = true
            //     break
            // }
        }
        if (defaultStepFound) {
            // Once the default step is found, then update the visibility of all the steps
            // that need to be shown as per the default step
            let prevIndex = this.updateVisibilityFromDefaultStep(previousStep)
            if (prevIndex !== -1) {
                previousStep = this.sectionConfiguration.steps[prevIndex]
            }
        }
        return {
            found: defaultStepFound,
            previousStep: previousStep
        }
    }

    updateVisibilityFromDefaultStep(defaultStep, lastTrackedIndex: number = -1): number {
        let lastIndex: number = -1
        let defaultStepIndex = this.getStepIndex(defaultStep.identifier)
        // If default step has no predicate rule, then increment the index till we get the next parent question
        if (defaultStep.navigationRule !== "predicate" && defaultStep.navigationRule !== 'predicateMultipleChoice') {
            // If the index is less than current index and the step is parent question, then increment the index
            while (((defaultStepIndex + 1) < this.questionIndex) && !this.isBranchQuestion(this.sectionConfiguration.steps[defaultStepIndex + 1])) {
                // if after incrementing the index by 1, the step should not be shown according to the param value
                // then increment the index by 2
                // if (!this.showStepBasedOnParam(this.sectionConfiguration.steps[defaultStepIndex + 1])) {
                //     if ((defaultStepIndex + 2) < this.questionIndex) {
                //         defaultStepIndex += 2
                //     } else {
                //         // If after incrementing the index by 2, the index is greater than current index
                //         // then dont increment and break the loop.
                //         break
                //     }
                // } else {
                    defaultStepIndex++
                // }
            }
        }
        lastIndex = defaultStepIndex
        defaultStep = this.sectionConfiguration.steps[defaultStepIndex]
        if (defaultStep.navigationRule === "predicate" || defaultStep.navigationRule === 'predicateMultipleChoice') {
            // First get the next independent question, before showing the questions according to the predicate logic
            let prevIndex = this.getFinalNextIndependentQuestionIndex(defaultStep)
            if (prevIndex !== -1 && prevIndex < this.questionIndex) {
                lastIndex = prevIndex
            } else {
                // If there is no next independent question, then update the visibility of all the child steps
                let bufferIndex = this.updatePredicateStepsVisibilityForStep(defaultStep)
                if (bufferIndex !== -1) {
                    lastIndex = bufferIndex
                    // Get the next independent question according to the child step that needs to be shown.
                    let nextIndependentIndex = this.getFinalNextIndependentQuestionIndex(this.sectionConfiguration.steps[bufferIndex])
                    if (nextIndependentIndex !== -1) {
                        lastIndex = nextIndependentIndex
                    } else {
                        // If no independent question is present according to the child step, then fetch the independent
                        // question according to the parent of that child step.
                        let parentQuestion = this.getParentQuestion(this.sectionConfiguration.steps[bufferIndex])
                        let nextIndependentIndex = this.getFinalNextIndependentQuestionIndex(parentQuestion)
                        if (nextIndependentIndex !== -1) {
                            lastIndex = nextIndependentIndex
                        }
                    }
                }
                // If no child step is to be shown according to the predicate rule, then check the default step id
                else if (defaultStep.defaultStepIdentifier && defaultStep.defaultStepIdentifier !== this.getCurrentStep().identifier) {
                    let nextDefaultStep = this.getStepById(defaultStep.defaultStepIdentifier)
                    // if (this.showStepBasedOnParam(nextDefaultStep)) {
                    //     // Again update the visibility of the next default step
                    //     // Also, keep the track of the previous step index that is to be shown.
                    //     let bufferIndex = this.updateVisibilityFromDefaultStep(nextDefaultStep, lastIndex)
                    //     if (bufferIndex !== -1) {
                    //         lastIndex = bufferIndex
                    //     }
                    // } else {
                        // If next default step is not supposed to be shown based on params,
                        // then check the immediate next step visibility
                        let nextDefaultStepIndex = this.getStepIndex(nextDefaultStep.identifier)
                        if ((nextDefaultStepIndex + 1) < this.questionIndex) {
                            let bufferIndex = this.updateVisibilityFromDefaultStep(this.sectionConfiguration.steps[nextDefaultStepIndex + 1], lastIndex)
                            if (bufferIndex !== -1) {
                                lastIndex = bufferIndex
                            }
                        }
                    }
                // }
            }
            // While the index calculated is not equal to the last tracked index, keep updating the default visibility.
            // while (lastIndex !== lastTrackedIndex && lastIndex !== -1 && this.showStepBasedOnParam(this.sectionConfiguration.steps[lastIndex])) {
            while (lastIndex !== lastTrackedIndex && lastIndex !== -1 ) {
                let bufferIndex = this.updateVisibilityFromDefaultStep(this.sectionConfiguration.steps[lastIndex], lastIndex)
                if (bufferIndex !== -1) {
                    lastIndex = bufferIndex
                }
                // If the index returned is -1 or the index calculated is equal to the last index then break the loop.
                if (lastIndex === bufferIndex || bufferIndex === -1) {
                    break
                }
            }
        }
        return lastIndex
    }

    getNextIndependentQuestionIndex(step: any): number {
        let stepIndex: number = this.getStepIndex(step.identifier)
        let nextIndependentStepIndex: number = -1
        // If the step has default stepId, then return -1 because the next question will always be this default step id
        if (step.defaultStepIdentifier) {
            return nextIndependentStepIndex
        } else {
            let nextStepIndexFound: boolean = false
            if (step.navigationRule !== "predicate" && step.navigationRule !== "predicateMultipleChoice" && (stepIndex + 1) < this.questionIndex) {
                // If two child questions share the same parent question and parent question navigation rule is predicate,
                // then immediate next question must be shown
                let parentStep = this.getParentOfSiblings(step, this.sectionConfiguration.steps[stepIndex + 1])
                if (parentStep && parentStep.navigationRule === 'predicate') {
                    nextIndependentStepIndex = stepIndex + 1
                    nextStepIndexFound = true
                }
            }
            if (!nextStepIndexFound) {
                for (let index = stepIndex + 1; index < this.sectionConfiguration.steps.length; index++) {
                    let currentStep = this.sectionConfiguration.steps[index]
                    // Continue till the current step is the child of the step because it is not the parent question
                    if (currentStep.predicateParentIdentifiers && currentStep.predicateParentIdentifiers.includes(step.identifier)) {
                        continue
                    }
                    // If the step is a parent question and the index is less than the current index
                    // then store the index
                    if (!this.isBranchQuestion(currentStep) && index < this.questionIndex) {
                        nextIndependentStepIndex = index
                        // if (this.showStepBasedOnParam(currentStep)) {
                        // }
                    } else {
                        // If the chain of parent questions break, then break the execution
                        break
                    }
                }
            }
        }
        return nextIndependentStepIndex
    }

    checkPredicateResultSteps(step: any): any {
        let predicateStepFound: boolean = true
        let previousStep: any = null
        for (let predicateId of step.predicateParentIdentifiers) {
            let predicateStep = this.getStepById(predicateId)
            // If the predicate step response is not satisfied according to the predicate rule, then we will
            // continue with the next predicate parent identifier.
            if (!this.isPredicateResultSatifisfied(predicateStep, step.identifier)) {
            // if (!this.isPredicateResultSatifisfied(predicateStep, step.identifier) || !this.showStepBasedOnParam(predicateStep)) {
                predicateStepFound = false
            } else {
                predicateStepFound = true
                // If the predicate step has furthur predicate parent identifiers, then call the function recursively
                if (predicateStep.predicateParentIdentifiers) {
                    let predicateStepResults = this.checkPredicateResultSteps(predicateStep)
                    if (!predicateStepResults.found) {
                        predicateStepFound = false
                    }
                }
                if (predicateStepFound) {
                    // If the predicate step is found, then update the visibility of all the child
                    // steps of that predicate step
                    let prevIndex = this.updatePredicateStepsVisibilityForStep(predicateStep)
                    if (prevIndex === -1) {
                        previousStep = JSON.parse(JSON.stringify(predicateStep))
                    } else {
                        previousStep = this.sectionConfiguration.steps[prevIndex]
                    }
                    break
                }
            }
        }
        return {
            found: predicateStepFound,
            previousStep: previousStep
        }
    }

    updatePredicateStepsVisibilityForStep(step: any, prevIndexes: number[] = []): number {
        let prevIndex: number = -1
        if (step.navigationRule === "predicate" || step.navigationRule === "predicateMultipleChoice") {
            let stepWithPredicateResults = step
            if (step.step === 'form') {
                stepWithPredicateResults = step.formItems.filter(ob => ob.predicateResults)[0]
            }
            this.updateVisibility(step)
            for (let predicateKeyIndex = Object.keys(stepWithPredicateResults.predicateResults).length - 1; predicateKeyIndex >= 0; predicateKeyIndex--) {
                let predicateKey = Object.keys(stepWithPredicateResults.predicateResults)[predicateKeyIndex]
                let previousPredicateKey = predicateKeyIndex > 0 ? Object.keys(stepWithPredicateResults.predicateResults)[predicateKeyIndex - 1] : null
                let step = this.sectionConfiguration.steps.filter(ob => ob.identifier === stepWithPredicateResults.predicateResults[predicateKey])
                let previousPredicateStep = previousPredicateKey ? this.sectionConfiguration.steps.filter(ob => ob.identifier === stepWithPredicateResults.predicateResults[previousPredicateKey]) : null
                // If same stepIds are mentioned multiple times in predicate results, then continue the execution.
                if (previousPredicateStep && previousPredicateStep[0].identifier === step[0].identifier) {
                    continue
                }
                // if (step[0].show === true && this.showStepBasedOnParam(step[0])) {
                if (step[0].show === true) {
                    let stepIndex = this.getStepIndex(step[0].identifier)
                    if (stepIndex < this.questionIndex) {
                        prevIndex = stepIndex
                        // Maintain all the step indexes that need to be shown in an array.
                        prevIndexes.push(prevIndex)
                        // If the step has furthur predicate navigation rule, then call the function recusrively
                        if (step[0].navigationRule === 'predicate' || step[0].navigationRule === "predicateMultipleChoice") {
                            let bufferPrevIndex = this.updatePredicateStepsVisibilityForStep(step[0], prevIndexes)
                            if (bufferPrevIndex !== -1 && bufferPrevIndex < this.questionIndex) {
                                prevIndex = bufferPrevIndex
                                prevIndexes.push(prevIndex)
                            }
                        }
                    }
                }
            }
        }
        if (prevIndexes.length > 0) {
            // Return the latest index that needs to be shown, because previous navigation, the immediate
            // previous step has to be shown
            let sortedPreviousIndexes = prevIndexes.sort((number1, number2) => {
                return number1 - number2
            })
            prevIndex = sortedPreviousIndexes[sortedPreviousIndexes.length - 1]
        }
        return prevIndex
    }

    getStepById(identifier: string): any {
        return this.sectionConfiguration.steps.filter(ob => ob.identifier === identifier)[0]
    }

    isPredicateResultSatifisfied(step: any, currentIdentifier: string): boolean {
        let isSatisfied: boolean = false
        switch (step.step) {
            case "form": {
                let stepWithPredicateResults = step.formItems.filter(ob => ob.predicateResults)[0]
                let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(stepWithPredicateResults, step)
                let key = `${stepWithPredicateResults.identifier}@${loglineRepeatKey}`
                if ((this.isMultiChoiceQuestion(stepWithPredicateResults) && !stepWithPredicateResults.dictionary) || Utility.isRepeatQuestion(stepWithPredicateResults)) {
                    key = `${step.identifier}.${key}`
                }
                isSatisfied = this.checkPredicateResponse(stepWithPredicateResults, currentIdentifier, key)
                break
            }
            default: {
                let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(step)
                let key = `${step.identifier}@${loglineRepeatKey}`
                isSatisfied = this.checkPredicateResponse(step, currentIdentifier, key)
                break
            }
        }
        return isSatisfied
    }

    checkPredicateResponse(step: any, currentIdentifier: string, formKey: string): boolean {
        let predicateResultSatified: boolean = false
        for (let predicateKey of Object.keys(step.predicateResults)) {
            if (step.predicateResults[predicateKey] === currentIdentifier) {
                let response = this.form.value[formKey]
                if (response === predicateKey || response.includes(predicateKey)) {
                    predicateResultSatified = true
                    break
                }
            }
        }
        return predicateResultSatified
    }


    onNext(): void {
        if (this.isVisualStep(this.getCurrentStep())) {
            // This is the last section in that step, thus, we'll set the childQuestionIndex to 0 and increment the parent ind
            if (this.childQuestionIndex === this.getCurrentStep().document.sections.length - 1) {
                this.childQuestionIndex = 0
                let nextStep = this.sectionConfiguration.steps[this.questionIndex + 1]
                this.changeStep(nextStep)
            } else {
                this.childQuestionIndex++
            }
            this.childQuestionChanged()
        } else {
            let currentStep = this.getCurrentStep()
            this.updateVisibility(currentStep)
            // This condition will directly jump to the next step which is present in destination identifier
            if (currentStep.navigationRule === 'direct') {
                let stepId = currentStep.destinationStepIdentifiers[0]
                let step = this.sectionConfiguration.steps.filter(ob => ob.identifier === stepId)[0]  // Here we are not checking conditional rendering of step based on param value.
                this.changeStep(step)
            } else {
                // Check if any branch question of the current question needs to be displayed as per the predicate logic.
                let questionChanged = this.checkPredicateResults(currentStep)
                // console.log(questionChanged);
                if (!questionChanged) {
                    // If there is no branch question displayed, then navigate to default step of the current step
                    if (currentStep.defaultStepIdentifier) {
                        let desiredStep = this.sectionConfiguration.steps.filter(ob => ob.identifier === currentStep.defaultStepIdentifier)
                        // if (this.showStepBasedOnParam(desiredStep[0])) {
                        //     this.changeStep(desiredStep[0])
                        // } else {
                            // else increment index, till we get next parent question / branch question that needs to be displayed depending on the show property
                            this.incrementQuestionIndex()
                        // }
                    }
                    else {
                        // else increment index, till we get next parent question / branch question that needs to be displayed depending on the show property
                        this.incrementQuestionIndex()
                    }
                }
            }
        }
        if (this.childQuestionIndex === 0 && this.hasNestedSections(this.getCurrentStep())) {
            this.setHTMLContent(this.getCurrentStep())
        }
        let displayTextParam = this.getParamActionDisplayText()
        if (displayTextParam) {
            this.setDisplayText(displayTextParam, this.getCurrentStep())
        }
        if (this.isLastStep()) {
            this.onCompletion()
        }
    }

    isLastStep(): boolean {
        return this.sectionConfiguration && this.questionIndex === this.sectionConfiguration.steps.length - 1
    }

    onCompletion(): void {
        if (this.isRegistrationForm() ||
            this.formService.isSurveyReadOnlyMode() ||
            (this.formService.selectedSection.completionStatus && this.formService.selectedSection.completionStatus.internalIdentifier ===
                SurveyConstants.COMPLETED_COMPLETION_STATUS)
        ) {
            return
        }
        let requestPayload = {
            completionStatusIdentifier: SurveyConstants.COMPLETED_COMPLETION_STATUS,
            sectionResponseId: this.formService.selectedSection.id,
        }
        this.formService.updateSurveySectionStatus(requestPayload, this.formService.selectedSection.id).subscribe({
            complete: () => console.log("Section Completed")
        })
    }

    isRegistrationForm(): boolean {
        return this.formService.configuration && this.formService.configuration.task === "form"
    }

    // Check if there is any branch question to be shown as per the predicate logic
    checkPredicateResults(step): boolean {
        let questionChanged: boolean = false
        let eligibleIndexes: number[] = []
        if (step.navigationRule === 'predicateMultipleChoice' || step.navigationRule === 'predicate') {
            let stepWithPredicateResults = step
            if (step.step === 'form') {
                stepWithPredicateResults = step.formItems.filter(ob => ob.predicateResults)[0]
            }
            for (let predicateKey of Object.keys(stepWithPredicateResults.predicateResults)) {
                let step = this.sectionConfiguration.steps.filter(ob => ob.identifier === stepWithPredicateResults.predicateResults[predicateKey])
                // if (step[0].show === true && this.showStepBasedOnParam(step[0])) {
                if (step[0].show === true) {
                    let nextInd = this.getStepIndex(step[0].identifier)
                    if (nextInd > this.questionIndex) {
                        eligibleIndexes.push(nextInd)
                        questionChanged = true
                    }
                }
            }
            if (questionChanged) {
                let sortedEligibleIndexes = eligibleIndexes.sort((number1, number2) => {
                    return number1 - number2
                })
                let nextStepIndex = sortedEligibleIndexes[0]
                this.changeStep(this.sectionConfiguration.steps[nextStepIndex])
            }
        }
        return questionChanged
    }

    displayQuestions(question,responseValue){
      // this.formService.configuration
      let SectionSteps;
      console.log(this.formService.configuration)
      this.formService.configuration.sections.forEach((element,ind)=>{
        element.steps.forEach((ele)=>{
          if(ele.identifier == question.identifier){
            // console.log('element',element)
            SectionSteps = element.steps;
          }
        })
      })

      let nextPredicateQuestion;
      if(question.navigationRule === 'predicate'){
        if(question.predicateResults.hasOwnProperty(responseValue)){
          nextPredicateQuestion = question.predicateResults[responseValue];
        } else {
          nextPredicateQuestion = question.defaultStepIdentifier;
        }
      }
      let currentQuestionIndex;
      currentQuestionIndex = SectionSteps.findIndex(el => el == question)
      currentQuestionIndex = currentQuestionIndex + 1;
      let currentQuestion = SectionSteps[currentQuestionIndex]

      if(question.isAns){

      } else {
        while (currentQuestion.identifier != nextPredicateQuestion) {
          currentQuestion = SectionSteps[currentQuestionIndex]
          currentQuestion['isHidden'] = true;
          currentQuestion = SectionSteps[currentQuestionIndex - 1]
          currentQuestion['isAns'] = true;
        }
      }
      this.stepsUpdateSubject.next(SectionSteps)
    }

    // 1
    // 2
    // 3
    //     4 hidden
    //     5 hidden
    // =>  6
    //     7


    saveIndividualResponse(questionId: string, responseValue: string, question: any, parentQuestion: any): void {
        // Call our own function, that would traverse through the questions and hide the ones that have opposing predicate logic
        console.log(questionId,question,parentQuestion)
        this.displayQuestions(question,responseValue)
        // this.displayQuestions()
        let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(question, parentQuestion)
        // Do not consider the logline repeat key from the question Id.
        questionId = Utility.extractStringValue(questionId, "@", 0)
        let responses: SurveySectionResponseItemData[] = []
        if (this.isMultiChoiceQuestion(question)) {
            let textChoiceLogLineRepeatKey = +Utility.extractKeyValueFromString("order", questionId)
            loglineRepeatKey = textChoiceLogLineRepeatKey ? textChoiceLogLineRepeatKey : loglineRepeatKey
            responses.push(new SurveySectionResponseItemData(questionId, responseValue, loglineRepeatKey, new Date().toISOString()))
        } else {
            responses.push(new SurveySectionResponseItemData(questionId, responseValue, loglineRepeatKey, new Date().toISOString()))
        }
        this.saveSectionResponse(responses)
    }


    isQuestionMultipleValuePicker(step): boolean {
        return step.answerFormat.type === 'multipleValuePicker'
    }

    isCurrentStepValidResponse(): boolean {
        let validityResponse = this.responseValidity
        let currentStep = this.getCurrentStep()
        let id = currentStep.identifier
        let keys = null
        // This condition is applied because validityResponse will only have keys at the form item level and not form level.
        if (currentStep.step === "form") {
            keys = currentStep.formItems.map(ob => ob.identifier)
        }
        let inValidResponses = Object.keys(validityResponse).filter(key =>
            ((!keys && id === key) || (keys && keys.includes(key))) &&
            validityResponse[key] === false
        )
        return inValidResponses.length === 0
    }


    saveSectionResponse(sectionResponse: SurveySectionResponseItemData[]): void {
        if (this.formService.configuration.task === "form") {
            this.saveFormSectionResponse(sectionResponse)
        } else {
            this.saveSurveySectionResponse(sectionResponse)
        }
    }

    saveSurveySectionResponse(sectionResponses: SurveySectionResponseItemData[]): void {
        let responses: SurveySectionResponseItemData[] = []
        for (let data of sectionResponses) {
            let storedItem: SurveySectionResponseItemData = DataStorage.getSurveyQuestionResponse(this.formService.selectedSection.id, data.itemOID, this.formService.selectedSurvey.id, data.logLineRepeatKey)
            if (!storedItem || storedItem.value !== data.value) {
                responses.push(data)
            }
        }
        if (responses.length > 0) {
            let finalResponses = responses.map(response => {
                response.itemOID = Utility.extractStringValue(response.itemOID, "?", 0)
                return response
            })
            // console.log(finalResponses)
            DataStorage.saveSurveySectionResponse(this.formService.selectedSection.id,
                finalResponses,
                this.formService.selectedSurvey.id
            )
            // this.formService.submitQuestionResponse(responses, Math.floor(this.progressPercent))
        }
    }



    saveFormSectionResponse(sectionResponses: SurveySectionResponseItemData[]): void {
        let response = DataStorage.getFormResponse(this.formService.selectedSection.id, this.formService.selectedSurvey.id)
        if (!response) {
            response = {}
        }
        for (let data of sectionResponses) {
            // Here itemOID will be the registration response object key
            let stepIdentifier = data.itemOID
            response[stepIdentifier] = data.value
        }
        DataStorage.saveFormSectionResponse(this.formService.selectedSection.id, response, this.formService.selectedSurvey.id)
    }

    isOptionalQuestion(formInput: FormInput): boolean {
        let isOptional: boolean = formInput.question.isOptional !== undefined ? formInput.question.isOptional : true
        // If the child question is mandatory and parent question is not, then dont show the asterik
        if (formInput.parentQuestion && !isOptional)
            isOptional = formInput.parentQuestion.isOptional != undefined ? formInput.parentQuestion.isOptional : isOptional
        return isOptional
    }


    isMultiChoiceQuestion(step): boolean {
        return step.answerFormat.type === 'textChoice' && step.answerFormat.style === 'multiple'
    }

    isQuestionAnswered(): boolean {
        let currentStep = this.getCurrentStep()
        let isAnswered = true
        if (currentStep.step === 'question') {
            isAnswered = this.isQuestionStepAnswered(currentStep)
        } else if (currentStep.step === "form") {
            isAnswered = this.isFormStepAnswered(currentStep)
        }
        return isAnswered
    }

    areAllQuestionsAnswered(questions: any): boolean {
        let allQuestionsAnswered: boolean = true
        for (let question of questions) {
            if (!this.isQuestionStepAnswered(question)) {
                allQuestionsAnswered = false
                break
            }
        }
        return allQuestionsAnswered
    }

    areAllQuestionsNotAnswered(questions: any): boolean {
        let allQuestionsNotAnswered: boolean = true
        for (let question of questions) {
            if (this.isQuestionStepAnswered(question)) {
                allQuestionsNotAnswered = false
                break
            }
        }
        return allQuestionsNotAnswered
    }

    isQuestionStepAnswered(currentStep: any): boolean {
        let isAnswered = true
        let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(currentStep)
        let key = `${currentStep.identifier}@${loglineRepeatKey}`
        if (this.isQuestionMultipleValuePicker(currentStep)) {
            for (let picker of currentStep.answerFormat.valuePickers) {
                key = `${picker.identifier}@${loglineRepeatKey}`
                if (!this.form.value[key] || this.form.value[key].length == 0) {
                    isAnswered = false
                    return isAnswered
                }
            }
        } else {
            isAnswered = this.form.value[key] && this.form.value[key] !== "" && !this.isArrayWithEmptyStrings(this.form.value[key])
        }
        return isAnswered
    }

    isArrayWithEmptyStrings(value: any): boolean {
        if (typeof value === "object") {
            let emptyStringsCount = value.filter(stringValue => stringValue === "" || stringValue === false)
            return emptyStringsCount.length === value.length
        }
        return false
    }

    isFormStepAnswered(currentStep: any): boolean {
        let isAnswered = true
        let answeredItemsCount: number = 0
        for (let item of currentStep.formItems) {
            let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(item, currentStep)
            let key = `${item.identifier}@${loglineRepeatKey}`
            if (this.isQuestionMultipleValuePicker(item)) {
                for (let picker of item.answerFormat.valuePickers) {
                    let pickerKey = `${picker.identifier}@${loglineRepeatKey}`
                    if (!this.form.value[pickerKey] || this.form.value[pickerKey].length === 0) {
                        if (item.isOptional === false) {
                            isAnswered = false
                            return isAnswered
                        }
                    } else {
                        answeredItemsCount++
                    }
                }
            } else {
                // If the question is of type anotherBg, anotherFalreup etc, parent question id is considered beacuse the formItemId is not unique
                if ((this.isMultiChoiceQuestion(item) && !item.dictionary) || Utility.isRepeatQuestion(item)) {
                    key = `${currentStep.identifier}.${key}`
                }
                if ((!this.form.value[key] || this.form.value[key] === "" || this.isArrayWithEmptyStrings(this.form.value[key]))) {
                    if (item.isOptional === false) {
                        isAnswered = false
                        return isAnswered
                    }
                } else {
                    answeredItemsCount++
                }
            }
        }
        // If all items are isOptional but the form is not isOptional, then check if one of the form items is answered
        isAnswered = answeredItemsCount > 0 ? true : false
        return isAnswered
    }

    incrementQuestionIndex(): void {
        let stepBeforeIncrementingIndex = this.sectionConfiguration.steps[this.questionIndex]
        this.questionIndex++
        if (stepBeforeIncrementingIndex.navigationRule !== 'predicate' && stepBeforeIncrementingIndex.navigationRule !== 'predicateMultipleChoice' && !stepBeforeIncrementingIndex.defaultStepIdentifier) {
            let parentStep = this.getParentOfSiblings(stepBeforeIncrementingIndex, this.sectionConfiguration.steps[this.questionIndex])
            if (parentStep && parentStep.navigationRule === "predicate") {
                this.questionChanged()
                return
            }
        }
        while (!this.getCurrentStep().show && this.isBranchQuestion(this.getCurrentStep())) {
            this.questionIndex++
        }
        // if (!this.showStepBasedOnParam(this.getCurrentStep())) {
        //     this.incrementQuestionIndex()
        // }
        this.questionChanged()
    }

    getParentOfSiblings(step1: any, step2: any): any {
        let step1ParentQuestion = this.getParentQuestion(step1)
        let step2ParentQuestion = this.getParentQuestion(step2)
        if (step1ParentQuestion && step2ParentQuestion && step1ParentQuestion.identifier === step2ParentQuestion.identifier) {
            return step1ParentQuestion
        }
        return null
    }

    isBranchQuestion(step): boolean {
        return this.getParentQuestion(step) ? true : false
    }

    getParentQuestion(step): any {
        let parentQuestion: any = null
        if (!step.predicateParentIdentifiers || step.predicateParentIdentifiers.length == 0) {
            return parentQuestion
        }
        //Consider the latest parent
        let parentQuestionId = step.predicateParentIdentifiers[step.predicateParentIdentifiers.length - 1]
        parentQuestion = this.getStepById(parentQuestionId)
        return parentQuestion
    }

    showStepBasedOnParam(step): boolean {
        let displayStep = true
        if (step.params) {
            for (let param of step.params) {
                // console.log(param.key)
                let fetchedParamValue = this.paramValues[param.key]
                if (fetchedParamValue) {
                    if (fetchedParamValue.toLowerCase() !== param.value.toLowerCase() && param.action.toLowerCase() === 'show') {
                        displayStep = false
                    }
                }
            }
        }
        return displayStep
    }


    setDisplayText(param: any, step: any): void {
        for (let paramObject of param) {
            let paramValue = this.paramValues[paramObject.key]
            step.text = step.text ? step.text.replace(paramObject.value, paramValue) : step.text
        }
    }

    updateVisibility(step: any): void {  // Depending on the current step's answer, which next question must be rendered
        if (step.step === "question") {
            this.updateVisibilityEachStep(step, null)
        } else if (step.step === "form") {
            for (let item of step.formItems) {
                this.updateVisibilityEachStep(item, step)
            }
        }
    }

    updateVisibilityEachStep(step, parentStep = null): void {
        let stepWithPredicateResults = step
        let loglineRepeatKey = this.formService.getFinalLoglineRepeatKey(step, parentStep)
        let key = `${step.identifier}@${loglineRepeatKey}`
        // If the question is of type anotherBg, anotherFalreup etc, parent question id is considered beacuse the formItemId is not unique
        if (parentStep && ((this.isMultiChoiceQuestion(step) && !step.dictionary) || Utility.isRepeatQuestion(step))) {
            key = `${parentStep.identifier}.${key}`
        }
        // If there is parent step, then parent step will have the navigation rule, else normal question will have the navigation rule.
        let stepWithNavigationRule = parentStep ? parentStep : step
        if ((stepWithNavigationRule.navigationRule === 'predicate' || stepWithNavigationRule.navigationRule === 'predicateMultipleChoice') && stepWithPredicateResults.predicateResults) {
            let destinationIdentifier = null;
            for (let predicateKey of Object.keys(stepWithPredicateResults.predicateResults)) {
                if ((typeof this.form.value[key] === 'object' && this.form.value[key] && this.form.value[key].includes(predicateKey)) || (this.form.value[key] === predicateKey)) {
                    this.sectionConfiguration.steps = this.sectionConfiguration.steps.map(ob => {
                        if (ob.identifier === stepWithPredicateResults.predicateResults[predicateKey]) {
                            destinationIdentifier = ob.identifier
                            ob.show = true
                        }
                        return ob
                    })
                } else {
                    this.sectionConfiguration.steps = this.sectionConfiguration.steps.map(ob => {
                        if (ob.identifier !== destinationIdentifier && ob.identifier === stepWithPredicateResults.predicateResults[predicateKey]) {
                            ob.show = false
                        }
                        return ob
                    })
                }
            }
        }
    }


    hasNestedSections(step): boolean {
        if (step.document && step.document.sections) {
            return true
        } else {
            return false
        }
    }

    // In visual step each nested section will be displayed on a new screen
    isVisualStep(step): boolean {
        return step ? step.step === 'visualConsent' : null
    }

    setHTMLContent(step): void {
        let fetchHtmlContentRequestPayload: string[] = [];
        // Clear the HTML Content before setting new one
        this.formService.clearHTMlContent();
        for (let section of step.document.sections) {
            if (section.sectionHtmlContentKey && section.sectionHtmlContentKey !== "" && (!section.sectionHTMLContentEndpoint || section.sectionHTMLContentEndpoint == "")) {
                fetchHtmlContentRequestPayload.push(section.sectionHtmlContentKey)
            } else if (section.sectionHTMLContentEndpoint && section.sectionHTMLContentEndpoint !== "") {
                this.formService.setExternalHtmlContent(section.sectionHtmlContentKey, section.sectionHTMLContentEndpoint)
            }
        }
        this.formService.setHtmlContent(fetchHtmlContentRequestPayload, this.sectionConfiguration.sectionHTMLContentEndpoint)
    }

    onSurveyCancelled(): void {
        this.resetAllIndexes()
        this.surveyStartedSubject.next(false)
        this.resetResponseValidity()
    }

}
