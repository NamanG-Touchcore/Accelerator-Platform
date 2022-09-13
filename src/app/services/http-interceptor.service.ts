import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, switchMap, tap, throwError } from "rxjs";
import { Authentication } from "./authentication.service";
import { ErrorSubjectService } from "./error-subject.service";
import { LoaderService } from "./loader.service";
import { FormService } from '../services/form.service';
import { CookieService } from 'ngx-cookie-service';
import { AppConfig } from "./app-config.service";



@Injectable()
export class HttpInterceptor implements HttpInterceptor {

    constructor(private appConfig: AppConfig, private cookieService: CookieService, private formService: FormService, private loaderService: LoaderService, private authenticationService: Authentication, private errorService: ErrorSubjectService) { }

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request = this.getFinalSetupRequest(httpRequest)
        this.setupLoading(request, "request")
        let expireAt = parseInt(this.cookieService.get("expires_at"))
        let currentDate = new Date();
        let currentTime = currentDate.getTime() / 1000;
        let tokenRefreshed = false
        //refresh the token 5 min prior to the expiration time, so we don't run into session timeout issue.
        // App config condition is added because we dont want to refresh the token, when api call is made to fetch the configuration
        if (currentTime >= (expireAt - 300) && !tokenRefreshed && !request.url.includes("refreshToken") && this.appConfig.configuration) {
            let refreshToken = this.cookieService.get("refresh_token")
            this.formService.getAuthenticationRefreshToken(refreshToken).subscribe(result => {
                currentDate = new Date();
                currentTime = currentDate.getTime() / 1000;
                // this.cookieService.set('refresh_token', result.refresh_token)
                // this.cookieService.set('bearer_token', result.access_token)
                expireAt = currentTime + parseInt(result.expires_in)
                // this.cookieService.set('expires_at', expireAt.toString())
                tokenRefreshed = true
            })
        }
        return next.handle(request).pipe(tap((event) => {
            if (event instanceof HttpResponse) {
                this.setupLoading(request, "response")
            }
        }), catchError((error: HttpErrorResponse) => {
            return this.handleReponseError(error, request, next)
        }))
    }

    handleReponseError(error: HttpErrorResponse, request?: HttpRequest<any>, next?: any): Observable<any> {
        // We are checking for 404 status and unauthorized message because subject profile endpoint gives 404 when token has just expired
        if (((error.status === 401) || (error.status === 404 && error.error && error.error.detail && error.error.detail.toLowerCase().includes("unauthorized"))) && this.cookieService.get("refresh_token")) {
            request = this.getFinalSetupRequest(request)
            return next.handle(request).pipe(tap((event) => {
                if (event instanceof HttpResponse) {
                    this.setupLoading(request, "response")
                }
            }), catchError((error: HttpErrorResponse) => {
                return this.handleReponseError(error, request, next)
            }))
        } else {
            this.loaderService.stopLoading()
            if (!request.params.get("validation")) {   // In case of validation APIs errors are handled in the component itself
                this.errorService.errorOccurred()
            }
        }
        return throwError(() => new Error(error.message))
    }

    getFinalSetupRequest(httpRequest: HttpRequest<any>): HttpRequest<any> {
        // Hardcode the tenant id for now
        let tenantId = "29e52c6d-b281-40eb-a739-b9a65419bf38"
        let token = this.authenticationService.getBearerToken()
        let finalRequest = httpRequest.clone({
            headers: httpRequest.headers
                .set("tenant", tenantId)
                .set("Authorization", "Bearer " + token)
        })

        return finalRequest
    }

    setupLoading(request: HttpRequest<any>, event: string): void {
        let showLoader = request.params.get("loader")
        if (showLoader) {
            switch (event) {
                case "request": {
                    let loadingMessage = request.params.get("message")
                    this.loaderService.startLoading(loadingMessage)
                    break
                }
                case "response": {
                    this.loaderService.stopLoading()
                    break
                }
            }
        }
    }
}