import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PlatesListComponent } from './plates-list.component';
import { RouterModule } from '@angular/router';
import { ListRoutes } from './plates-list.routes';
import { MaterialModule } from '../material/material.module';
import { RegionalListComponent } from './components/regional-list/regional-list.component';
import { UiModule } from '../ui/ui.module';

@NgModule({
  declarations: [
    PlatesListComponent,
    RegionalListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ListRoutes),
    MaterialModule,
    UiModule,
  ],
  exports: [],
  providers: []
})
export class PlatesListModule { }
