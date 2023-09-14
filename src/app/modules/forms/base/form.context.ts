import {
  AbstractControl,
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export abstract class FormContext<T> {
  static touchAll(control: AbstractControl): void {
    control.markAsTouched({ onlySelf: false });
    if (control instanceof UntypedFormGroup || control instanceof UntypedFormArray) {
      Object.values(control.controls).forEach((c: AbstractControl) => FormContext.touchAll(c));
    }
  }

  formValueChanges: Observable<T>;
  debounceTime = 500;
  subscriptions: any = [];
  get touched(): boolean {
    return this.form.touched;
  }
  get invalid(): boolean {
    return this.form.invalid;
  }
  get valueChanges(): Observable<T> {
    return this.form.valueChanges;
  }

  protected constructor(protected form: UntypedFormGroup, protected data?: any) {
    this.formValueChanges = form.valueChanges.pipe(debounceTime(this.debounceTime), distinctUntilChanged());
  }

  getControl(key: string): UntypedFormControl {
    return this.form.get(key) as UntypedFormControl;
  }

  validate(): boolean {
    FormContext.touchAll(this.form);
    return this.form.valid;
  }

  removeSubscriptions(): void {
    this.subscriptions?.forEach((subscription: any) => {
      subscription?.unsubscribe();
      subscription = null;
    });
    this.subscriptions = null;
  }

  resetForm(resetValue?: T): void {
    this.form.setValue(resetValue || {}, { onlySelf: true, emitEvent: false });
  }

  abstract getFormData(): T;

  protected clearValidators(controls: (AbstractControl | null)[]): void {
    controls.forEach((control: AbstractControl | null) => {
      control?.markAsUntouched();
      control?.clearValidators();
      control?.updateValueAndValidity({ emitEvent: false });
    });
  }

  protected disableFields(controls: (AbstractControl | null)[]): void {
    controls.forEach((control: AbstractControl | null) => control?.disable({ emitEvent: false }));
  }

  protected clearFields(controls: (AbstractControl | null)[] | null): void {
    controls?.forEach((control: AbstractControl | null) => control?.setValue(null, { emitEvent: false }));
  }

  protected setValidators(controls: (AbstractControl | null)[], validators?: ValidatorFn[]): void {
    const resultValidators = validators ? validators : [Validators.required];
    controls.forEach((control: AbstractControl | null) => control?.setValidators(resultValidators));
  }

  protected enableFields(controls: (AbstractControl | null)[]): void {
    controls.forEach((control: AbstractControl | null) => {
      control?.enable({ emitEvent: false });
      control?.markAsUntouched();
    });
  }
}
