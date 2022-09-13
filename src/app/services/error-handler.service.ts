import { ErrorHandler, Injectable } from "@angular/core";
import { ErrorSubjectService } from "./error-subject.service";



@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private errorService: ErrorSubjectService) { }

    previousErrorMessage: string = ""

    handleError(error: any): void {
        // Logging error to console 
        console.log("Error Occurred!!")
        console.log(error)
    }
}