import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { PlateFormModule } from '../plate-form/plate-form.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';

@NgModule({
  declarations: [ DashboardComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    PlateFormModule
  ],
  exports: [],
  providers: []
})
export class DashboardModule { }
