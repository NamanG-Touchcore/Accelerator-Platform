export class SurveySectionResponseItemData {
    constructor(
        public itemOID: string,
        public value: string,
        public logLineRepeatKey: number,
        public dateTimeStamp: string
    ) { }
}