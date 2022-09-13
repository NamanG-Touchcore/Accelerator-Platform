export class LegalAgreementResponse {
    constructor(
        public legalStatementId: string,
        public personId: string,
        public legalTypeInternalIdentifier: string
    ) { }
}