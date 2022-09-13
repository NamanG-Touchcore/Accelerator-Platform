import { CodeList } from "./code-list.model";
import { SectionResponse } from "./section-response.model";
import { Survey } from "./survey.model";

export class SubjectSurveyResponse {
    constructor(
        public id: string,
        public closeDate: string,
        public completionDate: string,
        public startDate: string,
        public openDate: string,
        public responseOrdinal: number,
        public timelineStatus: CodeList,
        public completionStatus: CodeList,
        public lastUsedMedium: CodeList,
        public overrideStatus: CodeList,
        public sectionResponses: SectionResponse[],
        public survey: Survey
    ) { }
}