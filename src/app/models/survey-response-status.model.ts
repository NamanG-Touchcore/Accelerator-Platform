export class SurveyResponseStatus {
    constructor(
        public responseId: string,
        public completionStatusIdentifier,
        public surveyMediumTypeIdentifier: string
    ) { }
}