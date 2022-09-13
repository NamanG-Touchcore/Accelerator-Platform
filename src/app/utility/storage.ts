import { SurveySectionResponseItemData } from "../models/survey-section-response-item-data.model";
import { SectionResponseProgress } from "../models/section-response-progress.model";
import { SectionCompletion } from "../models/section-completion.model";
import { Utility } from "./utility";

export class DataStorage {

    public static saveSurveySectionResponse(sectionResponseId: string, sectionResponseItemData: SurveySectionResponseItemData[], surveyResponseId: string): void {
        let sectionResponse = JSON.parse(localStorage.getItem(`${surveyResponseId}_sectionResponses`))
        sectionResponse = sectionResponse.map(ob => {
            if (ob.sectionResponseId === sectionResponseId) {
                ob.itemDatas.push(...sectionResponseItemData)
            }
            return ob
        })
        localStorage.setItem(`${surveyResponseId}_sectionResponses`, JSON.stringify(sectionResponse))
    }

    public static saveFormSectionResponse(sectionResponseId: string, data: any, surveyResponseId: string): void {
        let sectionResponse = JSON.parse(localStorage.getItem(`${surveyResponseId}_sectionResponses`))
        sectionResponse = sectionResponse.map(ob => {
            if (ob.sectionResponseId === sectionResponseId) {
                ob.responses = data
            }
            return ob
        })
        localStorage.setItem(`${surveyResponseId}_sectionResponses`, JSON.stringify(sectionResponse))
    }

    public static initializeSurveySectionResponse(sectionResponseId: string, surveyResponseId: string, sectionResponse: SurveySectionResponseItemData[] = []): void {
        let sectionResponses = localStorage.getItem(`${surveyResponseId}_sectionResponses`)
        console.log('sectionResponse',sectionResponse)
        let responses = []
        if (!sectionResponses) {
            responses.push(new SectionCompletion(sectionResponseId, sectionResponse))
        } else {
            responses = JSON.parse(sectionResponses)
            // Add a new section, only if section does not exists
            let existingSection = responses.filter(ob => ob.sectionResponseId === sectionResponseId)
            if (existingSection.length == 0) {
                responses.push(new SectionCompletion(sectionResponseId, sectionResponse))
            } else { // else override the existing section
                responses = responses.map(ob => {
                    if (ob.sectionResponseId === sectionResponseId) {
                        ob = new SectionCompletion(sectionResponseId, sectionResponse)
                    }
                    return ob
                })
            }
        }
        localStorage.setItem(`${surveyResponseId}_sectionResponses`, JSON.stringify(responses))
    }

    public static initializeFormSectionResponse(sectionResponseId: string, surveyResponseId: string): void {
        let sectionResponses = localStorage.getItem(`${surveyResponseId}_sectionResponses`)
        let responses = []
        if (!sectionResponses) {
            responses.push({ sectionResponseId: sectionResponseId, responses: {} })
        } else {
            responses = JSON.parse(sectionResponses)
            let existingResponse = responses.filter(ob => ob.sectionResponseId === sectionResponseId)
            if (existingResponse.length == 0) {
                responses.push({ sectionResponseId: sectionResponseId, responses: {} })
            }
        }
        localStorage.setItem(`${surveyResponseId}_sectionResponses`, JSON.stringify(responses))
    }

    // Get  section Responses which have response value 
    public static getSurveySectionResponseValue(sectionResponseId: string, surveyResponseId: string): SectionCompletion {
        let sectionResponses = JSON.parse(localStorage.getItem(`${surveyResponseId}_sectionResponses`))
        if (!sectionResponses) {
            return null
        }
        let selectedSectionResponse = sectionResponses.filter(ob => ob.sectionResponseId === sectionResponseId)
        if (selectedSectionResponse.length > 0) {
            selectedSectionResponse = selectedSectionResponse[0]
            selectedSectionResponse.itemDatas = selectedSectionResponse.itemDatas.filter(ob => ob.value)
            return selectedSectionResponse
        }
        return null
    }

    // Will get the entire response
    public static getFormResponse(sectionResponseId: string, surveyResponseId: string): any {
        let formResponse = localStorage.getItem(`${surveyResponseId}_sectionResponses`)
        if (!formResponse) {
            return null
        }
        let parsedFormResponse = JSON.parse(formResponse)
        let formSectionResponse = parsedFormResponse.filter(ob => ob.sectionResponseId === sectionResponseId)
        if (formSectionResponse.length == 0) {
            return null
        }
        return formSectionResponse[0].responses
    }


    public static getSurveyQuestionResponse(sectionResponseId: string, itemOId: string, surveyResponseId: string, logLineRepeatKey: number): SurveySectionResponseItemData {
        let response: SurveySectionResponseItemData = null
        itemOId = Utility.extractStringValue(itemOId, "?", 0)
        console.log('itemOId',itemOId)
        let sectionResponses = localStorage.getItem(`${surveyResponseId}_sectionResponses`)
        if (!sectionResponses) {
            return response
        }
        let parsedSectionResponse = JSON.parse(sectionResponses)
        let selectedSectionResponse = parsedSectionResponse.filter(ob => ob.sectionResponseId === sectionResponseId)
        if (selectedSectionResponse.length > 0) {
            let sectionResponseItemData = selectedSectionResponse[0].itemDatas.filter(ob => ob.itemOID === itemOId && ob.logLineRepeatKey === logLineRepeatKey)
            if (sectionResponseItemData.length > 0) {
                let index = sectionResponseItemData.length - 1 // Fetch the latest response
                response = sectionResponseItemData[index]
            }
        }
        console.log('response')
        console.log(response)
        return response
    }

    public static getFormQuestionResponse(sectionResponseId: string, stepIdentifier: string, surveyResponseId: string): string {
        let response: string = null
        let sectionResponses = localStorage.getItem(`${surveyResponseId}_sectionResponses`)
        if (!sectionResponses) {
            return response
        }
        let parsedSectionResponses = JSON.parse(sectionResponses)
        let selectedSectionResponse = parsedSectionResponses.filter(ob => ob.sectionResponseId === sectionResponseId)
        response = selectedSectionResponse[0].responses[stepIdentifier]
        return response
    }


    public static setSectionProgress(sectionResponseId: string, questionId: string, percentage: number, surveyResponseId: string): void {
        let sectionProgress: SectionResponseProgress[] = JSON.parse(localStorage.getItem(`${surveyResponseId}_sectionProgress`))
        if(sectionProgress){
        sectionProgress = sectionProgress.map(ob => {
            if (ob.sectionResponseId === sectionResponseId) {
                ob.lastVisitedQuestionId = questionId
                ob.progressPercentage = percentage
            }
            return ob
        })
        localStorage.setItem(`${surveyResponseId}_sectionProgress`, JSON.stringify(sectionProgress))
    }
}

    public static initializeSectionProgress(sectionResponseId: string, surveyResponseId: string): void {
        let sectionProgress = localStorage.getItem(`${surveyResponseId}_sectionProgress`)
        let parsedSectionProgress: SectionResponseProgress[] = []
        if (!sectionProgress) {
            parsedSectionProgress.push(new SectionResponseProgress(sectionResponseId, null, 0))
        } else {
            parsedSectionProgress = JSON.parse(sectionProgress)
            let existingSection = parsedSectionProgress.filter(ob => ob.sectionResponseId === sectionResponseId)
            if (existingSection.length === 0) {
                parsedSectionProgress.push(new SectionResponseProgress(sectionResponseId, null, 0))
            }
        }
        localStorage.setItem(`${surveyResponseId}_sectionProgress`, JSON.stringify(parsedSectionProgress))
    }


    public static getSectionProgress(sectionResponseId: string, surveyResponseId: string): SectionResponseProgress {
        let sectionProgress = localStorage.getItem(`${surveyResponseId}_sectionProgress`)
        let currentSectionProgress: SectionResponseProgress = null
        if (!sectionProgress) {
            return currentSectionProgress
        }
        let parsedSectionProgress = JSON.parse(sectionProgress)
        parsedSectionProgress = parsedSectionProgress.filter(ob => ob.sectionResponseId === sectionResponseId)
        if (parsedSectionProgress.length > 0) {
            currentSectionProgress = parsedSectionProgress[0]
        }
        return currentSectionProgress
    }

    public static getSurveySectionsProgress(surveyResponseId: string): SectionResponseProgress[] {
        let surveySectionProgress = localStorage.getItem(`${surveyResponseId}_sectionProgress`);
        if (!surveySectionProgress) {
            return null
        }
        return JSON.parse(surveySectionProgress)
    }

    // When a section is completed, reset all the indexes to 0 and percentage to 100.
    public static setSectionProgressPercentageOnCompletion(sectionResponseId: string, surveyResponseId: string): void {
        let sectionProgress = localStorage.getItem(`${surveyResponseId}_sectionProgress`)
        if (sectionProgress) {
            let parsedSectionProgress: SectionResponseProgress[] = JSON.parse(sectionProgress)
            parsedSectionProgress = parsedSectionProgress.map(ob => {
                if (ob.sectionResponseId === sectionResponseId) {
                    ob.lastVisitedQuestionId = null
                    ob.progressPercentage = 100   // This function will be called when a section is completed
                }
                return ob
            })
            localStorage.setItem(`${surveyResponseId}_sectionProgress`, JSON.stringify(parsedSectionProgress))
        }
    }

    public static clearSurveyData(surveyResponseId): void {
        localStorage.removeItem(`${surveyResponseId}_sectionResponses`);
        localStorage.removeItem(`${surveyResponseId}_sectionProgress`)
    }

    public static clearLocalStorage(): void {
        localStorage.clear()
    }

    public static getBearerToken(): string {
        let token = localStorage.getItem("bearer_token")
        return token
    }

}