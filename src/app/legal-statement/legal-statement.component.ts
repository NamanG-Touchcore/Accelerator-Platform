import { Component, Input, OnInit } from '@angular/core';
import { FormService } from 'src/app/services/form.service';
import { SubjectService } from 'src/app/services/subject.service';
import { LegalAgreement } from '../models/legal-agreement.model';
import { LegalAgreementResponse } from '../models/legal-agreement-response.model';
import { FormStepNavigator } from 'src/app/services/form-step-navigator.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-legal-statement',
  templateUrl: './legal-statement.component.html',
  styleUrls: ['./legal-statement.component.scss']
})
export class LegalStatementComponent implements OnInit {

  constructor(private router: Router, private formService: FormService, private subjectService: SubjectService, private formStepNavigatorService: FormStepNavigator) { }
  legalAgreement: LegalAgreement[] = []
  index: number = 0
  checked: boolean = false
  ngOnInit(): void {
    this.formService.getLegalAgreement(this.subjectService.loggedInSubject.personId).subscribe(result => {
      this.legalAgreement = result
      //if user has already accepted legal agreement
      if (result.length === 0) {
        this.router.navigate(['surveys'])
      }
    })
  }

  getCurrentLegalStatement(): LegalAgreement {
    return this.legalAgreement[this.index]
  }

  onNext(): void {
    this.index++
    this.checked = false
  }

  onSubmitLegalAgreement(): void {
    let submitLegalAgreementRequestPayload: LegalAgreementResponse[] = []
    for (let item of this.legalAgreement) {
      submitLegalAgreementRequestPayload.push(new LegalAgreementResponse(
        item.legalStatementId,
        this.subjectService.loggedInSubject.personId,
        item.legalTypeInternalIdentifier))
    }
    this.formService.updateLegalAgreement(this.subjectService.loggedInSubject.personId, submitLegalAgreementRequestPayload).subscribe({
      complete: () => {
        this.router.navigate(['surveys'])
      }
    })
  }
}
