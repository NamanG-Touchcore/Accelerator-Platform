import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormService } from 'src/app/services/form.service';



@Component({
  selector: 'app-form-show-esignature-info',
  templateUrl: './form-show-esignature-info.component.html',
  styleUrls: ['./form-show-esignature-info.component.scss']
})

export class FormShowEsignatureInfoComponent implements OnInit {
  @Output() onClose = new EventEmitter<boolean>(false);
  constructor(private formService: FormService) { }
  signature: any;
  configuration: any;
  signedDate: any;
  signedTime: any;

  onCloseClick(): void {
    this.onClose.next(true)
  }

  ngOnInit(): void {
    this.formService.getSignatureDetails().subscribe(result => {
      this.signature = result
      this.signedDate = this.signature.signatureDetails.signedOnDate.split("T")[0]
      this.signedTime = this.signature.signatureDetails.signedOnDate.split("T")[1].substring(0,5)
      var signatureConfigurationDetails = this.signature.signatureConfiguration.replaceAll("'", '"')
      this.configuration = JSON.parse(signatureConfigurationDetails)
    })
  }
}