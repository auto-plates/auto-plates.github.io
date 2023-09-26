import { NgModule } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ControlDirective } from './directives/control.directive';
import { InputComponent } from './components/input/input.component';

@NgModule({
  declarations: [ControlDirective, InputComponent],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [InputComponent],
  providers: [],
})
export class FormsModule {}
