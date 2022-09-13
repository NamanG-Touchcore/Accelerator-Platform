import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { TranslateService } from '@ngx-translate/core';

declare const sendMessageToFlutter: any;

@Injectable({ providedIn: 'root' })
export class LoaderService {

  constructor(private CookieService: CookieService, public translate: TranslateService) { }
  showLoader = new BehaviorSubject<any>({
    isLoading: false,
    loadingMessage: null
  })
  isLoading: boolean = false

  startLoading(message: string) {
    // sendMessageToFlutter('{"showProgress" : true}')
    /* Commented for iOS */
    this.showLoader.next({
       isLoading: true,
       loadingMessage: message
    })
  }

  stopLoading() {
    // sendMessageToFlutter('{"showProgress" : false}')
    /* Commented for iOS */
    this.isLoading = false
    this.showLoader.next({
       isLoading: false,
       loadingMessage: null
    })
  }
}
