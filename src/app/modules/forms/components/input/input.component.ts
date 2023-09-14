import { Component, Input } from '@angular/core';
import { ControlDirective } from '../../directives/control.directive';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent extends ControlDirective {
  @Input() showCloseBtn = true;
  @Input() type = 'text';
  @Input() showLabel = true;
  @Input() placeholder = '';
  @Input() maxLength: number;

  clear(): void {
    this.control.setValue(null);
  }
}
