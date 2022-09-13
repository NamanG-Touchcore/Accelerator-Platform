import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { SubjectProfile } from '../models/subject-profile.model';
import { Authentication } from '../services/authentication.service';
import { FormService } from '../services/form.service';
import { SubjectService } from '../services/subject.service';
import { TranslateService } from '@ngx-translate/core';
import { NavigationStart, Router } from '@angular/router';
import { AppConfig } from '../services/app-config.service';
declare const sendMessageToFlutter: any;

@Component({
  selector: 'app-subject-profile',
  templateUrl: './subject-profile.component.html',
  styleUrls: ['./subject-profile.component.scss']
})
export class SubjectProfileComponent implements OnInit {
  subjectDetails: SubjectProfile = null
  preferredLanguage: string = ""
  notificationToggled: boolean = false
  profileDetails : any;
  availableLanguages: any;
  displayDeleteAccountModal: string = 'none'

  constructor(private cookieService: CookieService,
    private formService: FormService,
    private subjectService: SubjectService,
    public translate: TranslateService,
    private authenticationService: Authentication,
    private appConfig: AppConfig) {
    this.preferredLanguage = this.cookieService.get("preferredLanguage")
    translate.setDefaultLang(this.preferredLanguage);
  }

  ngOnInit(): void {
    this.formService.getSubjectDetails(this.subjectService.loggedInSubject.subjectId).subscribe(result => {
    this.profileDetails = result
    this.subjectDetails = new SubjectProfile(this.profileDetails.subjectProfileDetails.firstName, this.profileDetails.subjectProfileDetails.lastName, this.subjectService.loggedInSubject.subjectIdentifier)
    var languages = this.profileDetails.languageConfiguration.replaceAll("'", '"')
    this.availableLanguages = JSON.parse(languages)
    })
  }

  onToggle(): void {
    sendMessageToFlutter(`{"screen" : "MAIN_SCREEN","action" : "NOTIFICATION_PERMISSION"}`)
  }
  
  showDeleteAccountModal(): void{
    this.displayDeleteAccountModal = "block"
  }

  closeDeleteAccountModal(): void{
    this.displayDeleteAccountModal = "none"
  }

  getNotificationToggleStatus(): boolean {
    let notificationStatus = this.cookieService.get("notification_status")
    if (notificationStatus) {
      this.notificationToggled = notificationStatus.toLowerCase() == "permissionstatus.granted" ? true : false
    }
    return this.notificationToggled
  }

  selected(selectedLanguage): void {
    this.preferredLanguage = selectedLanguage
    this.cookieService.set('preferredLanguage', selectedLanguage)
    this.subjectService.setLoggedInSubjectDetails()
    this.formService.updateSubjectLanguage(this.subjectService.loggedInSubject.subjectId, this.subjectService.loggedInSubject.personId, selectedLanguage).subscribe();
    sendMessageToFlutter(`{"change" : "NEW_LANGUAGE","action" : "${selectedLanguage}"}`)
    }

  onSignOut(): void {
    this.authenticationService.onLogout()
  }
  
  getPrivacyPolicyLink(): string {
    return `${this.appConfig.configuration.portalUrl}?page=Privacy`
  }

  getTermsOfUseLink(): string {
    return `${this.appConfig.configuration.portalUrl}?page=Terms`
  }

}
