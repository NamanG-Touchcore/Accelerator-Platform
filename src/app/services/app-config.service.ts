import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, tap } from "rxjs";

@Injectable({ providedIn: 'root' })
export class AppConfig {
    configuration: any
    constructor(private httpClient: HttpClient) { }

    loadAppConfig(): Observable<any> {
        return this.httpClient.get("/assets/app-config.json").pipe(tap(result => [
            this.configuration = result
        ]))
    }
}