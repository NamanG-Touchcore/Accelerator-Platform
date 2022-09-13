import { SurveySectionResponseItemData } from "./survey-section-response-item-data.model";

export class SectionCompletion {
    constructor(public sectionResponseId: string, public itemDatas: SurveySectionResponseItemData[]) { }
}