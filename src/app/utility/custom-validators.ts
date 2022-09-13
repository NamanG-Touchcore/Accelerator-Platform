import { FormControl, ValidatorFn } from "@angular/forms";

export class CustomValidators {

    static dateMinimum(date: string): ValidatorFn {
        // The following statement can return key value pair or null.
        return (control: FormControl): { [key: string]: any } | null => {
            if (control.value && control.value < date) {
                return { "minimumDate": true } // Returns object if the validation fails. 
            }
            return null; // Returns null if the validation passes
        }
    }

    static dateMaximum(date: string = null): ValidatorFn {
        // The following statement can return key value pair or null.
        return (control: FormControl): { [key: string]: any } | null => {
            let maximumDate = date ? date : new Date().toISOString().split('T')[0]
            if (control.value && control.value > maximumDate) {
                return { "maximumDate": true } // Returns object if the validation fails. 
            }
            return null; // Returns null if the validation passes
        }
    }

}