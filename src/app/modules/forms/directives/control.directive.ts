import {
  AfterViewChecked,
  ChangeDetectorRef,
  Directive,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';
import { MatFormFieldAppearance } from '@angular/material/form-field';
import { IDefaultControl } from 'src/app/interfaces/default-control.interface';
import { ControlOptionsEnum } from '../types/control-options.enum';
import { tap } from 'rxjs';
import { ValidationService } from '../services/validation.service';
import { FormControlsOptionsService } from '../services/form-controls-options.service';

@Directive({
  selector: '[appControl]',
})
export class ControlDirective implements OnInit, AfterViewChecked, OnDestroy {
  @Input() control: any = new UntypedFormControl();
  @Input() options?: IDefaultControl[];
  @Input() optionsType?: ControlOptionsEnum;
  @HostBinding('class.app-control') baseClass = true;
  @HostBinding('class.app-control-disabled') get disabled(): boolean {
    return this.control?.disabled;
  }

  appearance = 'none' as unknown as MatFormFieldAppearance;
  isLoadingOptions: boolean;
  get error(): string | null {
    return this.validationService.getValidationErrorMessage(this.control);
  }
  get errorState(): boolean {
    return this.control.invalid && (this.control.dirty || this.control.touched);
  }

  constructor(
    protected validationService: ValidationService,
    protected formControlsOptionsService: FormControlsOptionsService,
    protected cdf: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  ngAfterViewChecked(): void {
    this.cdf.detectChanges();
  }

  ngOnDestroy(): void {}

  focusControl(): void {}

  getControlOptions(): void {
    if (this.options) {
      return;
    }

    this.startSpinner();
    this.formControlsOptionsService
      .getOptions(this.optionsType)
      .pipe(tap(this.stopSpinner))
      .subscribe(this.handleOptions);
  }

  protected resetControl(control: AbstractControl): void {
    control?.clearValidators();
    control?.markAsUntouched({ onlySelf: true });
    control?.markAsPristine();
    control?.setValue(null, { emitEvent: false });
  }

  private startSpinner = (): void => {
    this.isLoadingOptions = true;
  };

  private stopSpinner = (): void => {
    this.isLoadingOptions = false;
  };

  private handleOptions = (options: IDefaultControl[]): void => {
    this.options = options;
    this.cdf.detectChanges();
  };
}
