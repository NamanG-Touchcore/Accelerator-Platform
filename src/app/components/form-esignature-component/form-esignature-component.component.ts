import { Component, EventEmitter, OnInit, Output, Input, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import * as CryptoJS from 'crypto-js';
import { forkJoin, Observable } from 'rxjs';


@Component({
  selector: 'app-form-esignature-component',
  templateUrl: './form-esignature-component.component.html',
  styleUrls: ['./form-esignature-component.component.scss']
})
export class FormEsignatureComponentComponent implements OnInit {

  @Output() eSignatureCancelled = new EventEmitter<boolean>(false)
  @Output() eSignatureCompleted = new EventEmitter<boolean>(false)
  @Output() submitSurvey = new EventEmitter<boolean>(false);
  @ViewChild("eConsentForm", { static: true }) eConsentForm: NgForm
  error: string = null
  displayStaticModalStyle: string = "none"
  hide: boolean = true;
  isUserVerified: boolean = false
  isVerifying: boolean = false



  togglePasswordView(): void {
    this.hide = !this.hide;
  }

  constructor(private formService: FormService) { }

  ngOnInit(): void {
    this.error = null
  }
  finalSubmit(): void {
    this.eSignatureCompleted.next(true)
  }
  onSubmit(): void {
    this.isVerifying = true
    let userAccountDetailsObservable = this.formService.getLoggedInUserDetails();
    let passwordEncryptionKeyObservable = this.formService.getPasswordEncryptionKey();
    let observableArray: Observable<any>[] = [userAccountDetailsObservable, passwordEncryptionKeyObservable]
    forkJoin(observableArray).subscribe(([accountDetails, encryptionKey]) => {
      this.error = null
      let encryptedPassword = this.getEncryptedPassword(this.eConsentForm.value.password, encryptionKey)
      let userDetails = {
        username: accountDetails.username,
        password: encryptedPassword,
        authenticationMedium: "WEB"
      }
      this.formService.authenticateUser(userDetails).subscribe(result => {
        this.isUserVerified = true
        this.isVerifying = false
        this.eConsentForm.reset()
      }, error => {
        // console.log("Authentication Failed")
        this.displayStaticModalStyle = "block"
        this.isUserVerified = false
        this.isVerifying = false
      })
    })
  }


  getEncryptedPassword(password: string, encryptionKey: string): void {
    var key = CryptoJS.enc.Utf8.parse(encryptionKey);
    let randomIv = CryptoJS.lib.WordArray.random(128 / 2).toString().slice(0, 16);
    var iv = CryptoJS.enc.Utf8.parse(randomIv);
    let encryptedPassword = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(password), key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    })
    encryptedPassword = `${randomIv}.${encryptedPassword}`
    return encryptedPassword
  }

  cancelESignature(): void {
    this.error = null
    this.eConsentForm.reset()
    this.eSignatureCancelled.next(true)
    this.isUserVerified = false
  }

  onStaticModalClose(): void {
    this.displayStaticModalStyle = "none"
  }


}
