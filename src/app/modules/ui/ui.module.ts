import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [ TabsComponent ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ TabsComponent ],
  providers: []
})
export class UiModule { }
