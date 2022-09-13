export class SurveyCompletion {
    constructor(
        public sourceSystem: string,
        public subjectKey: string,
        public subjectIdentifier: string,
        public studyOID: string,
        public DCISystemOID: string,
        public metaDataVersionOID: string,
        public userOID: string,
        public surveyResponse: any
    ) { }
}