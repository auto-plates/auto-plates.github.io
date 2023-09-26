import { Component, Input, ViewChild } from '@angular/core';
import { ControlDirective } from '../../directives/control.directive';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent extends ControlDirective {
  @ViewChild(MatInput) input: MatInput;
  @Input() showCloseBtn = true;
  @Input() type = 'text';
  @Input() showLabel = true;
  @Input() placeholder = '';
  @Input() maxLength: number;

  clear(): void {
    this.control.setValue(null);
  }

  focusControl(): void {
    if (!this.input) {
      return;
    }

    setTimeout(() => {
      this.input.focus();
    });
  }
}
