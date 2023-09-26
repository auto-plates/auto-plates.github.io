import { Injectable } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { ErrorCodeEnum } from '../types/error-code.enum';

@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  public getValidationErrorMessage(control: UntypedFormControl): string | null {
    if (!control.errors) {
      return null;
    }

    if (control.hasError(ErrorCodeEnum.serverError)) {
      return control.getError(ErrorCodeEnum.serverError);
    }

    if (control.hasError(ErrorCodeEnum.required)) {
      return 'Field is required';
    }

    if (control.hasError(ErrorCodeEnum.minLength)) {
      const error = control.getError(ErrorCodeEnum.minLength);
      return `Field must contain at least ${error?.requiredLength} characters`;
    }

    return null;
  }
}
