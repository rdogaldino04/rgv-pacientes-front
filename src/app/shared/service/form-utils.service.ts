import { Injectable } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
   // UntypedFormArray,
   // UntypedFormControl,
   // UntypedFormGroup
  } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormUtilsService {

    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
          const control = formGroup.get(field);
          //if (control instanceof UntypedFormControl) {
            control.markAsTouched({ onlySelf: true });
          //} else if (
            //control instanceof UntypedFormGroup ||
            //control instanceof UntypedFormArray
          //) {
            //control.markAsTouched({ onlySelf: true });
            //this.validateAllFormFields(control);
          //}
        });
    }

    getFieldErrorMessage(formGroup: FormGroup, fieldName: string): string {
        const field = formGroup.get(fieldName) as FormControl;
        return this.getErrorMessageFromField(field);
    }

    getErrorMessageFromField(field: FormControl): string {
        if (field?.hasError('required')) {
          return 'Field is required.';
        }
    
        if (field?.hasError('maxlength') && field.errors) {
          const requiredLength = field.errors['maxlength']['requiredLength'];
          return `Field cannot be more than ${requiredLength} characters long.`;
        }
    
        if (field?.hasError('minlength') && field.errors) {
          const requiredLength = field.errors['minlength']['requiredLength'];
          return `Field cannot be less than ${requiredLength} characters long.`;
        }
    
        if (field?.hasError('cpfInvalido')) {
            return 'Field CPF is invalid.';
        }

        return field['errors'] ? 'Error' : '';
    }

}