import { AfterContentInit, Component, OnInit } from '@angular/core';
import { ErrorSubjectService } from './services/error-subject.service';
import { SubjectService } from './services/subject.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import { Authentication } from './services/authentication.service';
import { AppConfig } from './services/app-config.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss', '../accelerator.scss']
})



export class AppComponent implements OnInit, AfterContentInit {
  title = 'Nof1-MobileApp';
  displayLogoutModal: string = 'none'
  displayErrorModalStyle: string = "none"
  stopTimer: boolean = false
  lastActivityTime = new Date().getTime() / 1000;

  constructor(private subjectService: SubjectService,
    private errorService: ErrorSubjectService,
    public translate: TranslateService,
    private cookieService: CookieService,
    private authenticationService: Authentication,
    private appConfig: AppConfig,
  ) {
    let preferredLanguage = "en"
    // console.log('preferredLanguege',preferredLanguage)
    translate.use(preferredLanguage);

    // if (this.cookieService.get("userLoggedIn") == 'true') {
    //   this.activityWatcher()
    // }

  }

  ngOnInit(): void {
    // console.log("call setLoggedInSubjectDetails")
    // this.subjectService.setLoggedInSubjectDetails()
    // this.errorService.errorSubject.subscribe(hasError => {
    //   this.displayErrorModalStyle = "block"
    // })
  }


  ngAfterContentInit(): void {
    // console.log("call setLoggedInSubjectDetails")
    // this.subjectService.setLoggedInSubjectDetails()
  }

  // onLogout(): void {
  //   this.authenticationService.onLogout()
  // }

  // onStayLoggedIn(): void {
  //   //this is called when user clicks on cancel when modal opens
  //   this.lastActivityTime = new Date().getTime() / 1000;
  //   this.displayLogoutModal = 'none'
  //   this.stopTimer = true
  //   this.activityWatcher()
  // }

  // onStaticModalClose(): void {
  //   this.displayErrorModalStyle = "none"
  // }

  activityWatcher(): void {
    //this function is used to track activity of user in the app
    let secondsSinceLastActivity = 0;
    let maxInactivity = this.appConfig.configuration.idleTimeoutPeriodForLogoutPopup;
    let interval;
    interval = setInterval(() => {
      let now = new Date().getTime() / 1000;
      let diff = now - this.lastActivityTime;
      // This if block is used to trigger the popup when the app comes from background to foreground
      if (diff > maxInactivity) {
        //when seconds of inactivity is greater than max inactivity time allowed, modal is shown
        this.triggerModall();
        secondsSinceLastActivity = 0;
        clearInterval(interval);
      }
      this.lastActivityTime = now;
      secondsSinceLastActivity++;
      // This if block is used to trigger the popup when the app is in foreground but there is no activity in the application
      if (secondsSinceLastActivity > maxInactivity) {
        //when seconds of inactivity is greater than max inactivity time allowed, modal is shown
        this.triggerModall();
        secondsSinceLastActivity = 0;
        clearInterval(interval);
      }
    }, 1000);

    let activityEvents = [
      'mousedown', 'mousemove', 'keydown',
      'scroll', 'touchstart'
    ];
    //time is reseted every time the these events are triggered
    activityEvents.forEach(function (eventName) {
      document.addEventListener(eventName, () => {
        secondsSinceLastActivity = 0;
      }, true);
    });
  }

  triggerModall(): void {
    this.stopTimer = false
    this.displayLogoutModal = 'block'
    this.setTimer()
  }

  setTimer(): void {
    //this function sets timer after the logout modal is shown, after certain time user will get automatically logged out
    let interval
    let timer = this.appConfig.configuration.idleTimeoutPeriodForLogout
    if (timer != 0) {
      interval = setInterval(() => {
        if (this.stopTimer) {
          clearInterval(interval)
          timer = this.appConfig.configuration.idleTimeoutPeriodForLogout
        } else {
          timer--
          if (timer == 0) {
            clearInterval(interval)
            this.authenticationService.onLogout()
          }
        }
      }, 1000)
    }
  }
}
