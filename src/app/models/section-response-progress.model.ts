// This represents section progress model which is stored in local storage
export class SectionResponseProgress {
    constructor(
        public sectionResponseId: string,
        public lastVisitedQuestionId: string,
        public progressPercentage: number,
    ) { }
}