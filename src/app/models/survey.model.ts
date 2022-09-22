import { SurveyConfigurationSettings } from "./survey-configuration-settings.model";

export class Survey {
    constructor(
        public id: string,
        public displayName: string,
        public internalIdentifier: string,
        public responseOrdinalDisplayNameTemplate: string,
        public InitiatingEventInterval: string,
        public configurationSettings: SurveyConfigurationSettings[]
    ) { }
}
