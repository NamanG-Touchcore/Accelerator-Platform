import { Injectable } from "@angular/core";
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class SettingsService {

    constructor(private cookieService: CookieService) { }

    getLanguage(): any {
        let preferredLanguage = this.cookieService.get("preferredLanguage")
        return preferredLanguage;
    }

}