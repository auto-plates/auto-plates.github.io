import { NgModule } from '@angular/core';
import { PlateFormComponent } from './components/plate-form/plate-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../forms/forms.module';
import { PlateSearchResultComponent } from './components/plate-search-result/plate-search-result.component';
import { MaterialModule } from '../material/material.module';
import { RegionalListComponent } from './components/regional-list/regional-list.component';

@NgModule({
  declarations: [
    PlateFormComponent,
    PlateSearchResultComponent,
    RegionalListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    PlateFormComponent,
    PlateSearchResultComponent,
    RegionalListComponent,
  ],
  providers: []
})
export class PlateFormModule { }
