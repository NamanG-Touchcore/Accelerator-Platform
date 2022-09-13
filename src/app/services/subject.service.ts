import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class SubjectService {
    constructor(private cookieService: CookieService) { }
    loggedInSubject: any = null;

    setLoggedInSubjectDetails(): void {
        this.loggedInSubject = {
            // "personId": this.cookieService.get("personId"),
            // "subjectIdentifier": this.cookieService.get("subjectIdentifier"),
            // "subjectId": this.cookieService.get("subjectId"),
            // "username": this.cookieService.get("username"),
            // "preferredLanguage": this.cookieService.get("preferredLanguage")
        }
        // console.log("Username from subjectIdentifier =" + this.cookieService.get("subjectIdentifier"))
        // console.log("Username from service =" + this.loggedInSubject.username)
    }
}