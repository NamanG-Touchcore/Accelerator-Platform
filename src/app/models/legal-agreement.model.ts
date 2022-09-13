export class LegalAgreement {
    constructor(
        public legalStatementId: string,
        public legalStatementText: string,
        public legalStatementTypeId: string,
        public legalTypeInternalIdentifier: string,
    ) { }
}