import { CodeList } from "./code-list.model";
import { SectionProgress } from "./section-progress.model";
import { Section } from "./section.model";


export class SectionResponse {
    constructor(
        public sectionResponseDetails: string,
        public id: string,
        public completionStatus: CodeList,
        public section: Section,
        public sectionCompletionStatus: string,
        public ordinal: number,
        public surveySectionResponseProgress: SectionProgress
    ) { }
}