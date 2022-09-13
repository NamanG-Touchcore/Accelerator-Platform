import { Injectable } from "@angular/core"
import { CookieService } from 'ngx-cookie-service';

declare const sendMessageToFlutter: any;

@Injectable({ providedIn: 'root' })
export class Authentication {
    constructor(private cookieService: CookieService) { }
    public getBearerToken(): string {
        let token = this.cookieService.get("bearer_token")
        return token
    }

    onLogout(): void {
        this.cookieService.deleteAll()
        sendMessageToFlutter('{"screen" : "SUBJECT_PROFILE","action" : "SIGN_OUT"}')
    }

}