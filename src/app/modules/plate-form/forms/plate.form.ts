import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { FormContext } from 'src/app/modules/forms/base/form.context';

export class PlateForm extends FormContext<any> {
  static createForm(): PlateForm {
    const form = new UntypedFormGroup({
      plateCode: new UntypedFormControl(null, [
        Validators.pattern("^[a-zA-Z -']+"),
      ]),
    });

    return new PlateForm(form);
  }

  get plateCode(): UntypedFormControl {
    return this.getControl('plateCode');
  }

  constructor(public form: UntypedFormGroup) {
    super(form);
  }

  getFormData(): any {
    return this.form.value;
  }
}
