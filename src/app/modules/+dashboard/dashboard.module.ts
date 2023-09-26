import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { DashboardRoutes } from './dashboard.routes';
import { PlateFormComponent } from '../plate-form/components/plate-form/plate-form.component';
import { PlateSearchResultComponent } from '../plate-form/components/plate-search-result/plate-search-result.component';
import { GoogleMapModule } from '../google-map/google-map.module';
import { FormsModule } from '../forms/forms.module';

@NgModule({
  declarations: [
    DashboardComponent,
    PlateFormComponent,
    PlateSearchResultComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DashboardRoutes),
    RouterModule,
    MaterialModule,
    FormsModule,
    GoogleMapModule,
  ],
  exports: [],
  providers: [],
})
export class DashboardModule {}
