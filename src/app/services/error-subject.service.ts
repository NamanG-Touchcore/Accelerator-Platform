import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ErrorSubjectService {

    errorSubject = new Subject<boolean>()

    errorOccurred(): void {
        this.errorSubject.next(true)
    }

}