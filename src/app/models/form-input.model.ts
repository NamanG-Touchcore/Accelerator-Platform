import { FormGroup } from "@angular/forms";

export class FormInput {
    constructor(public question: any, public form: FormGroup, public parentQuestion: any) { }
}