export class CodeList {
    constructor(
        public alternateDescription: string,
        public description: string,
        public internalIdentifier: string,
        public setName: string,
        public sortOrder: number,
        public value: string
    ) { }
}