import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ GoogleMapComponent ],
  imports: [
    CommonModule,
    GoogleMapsModule,
    MaterialModule,
  ],
  exports: [ GoogleMapComponent ],
  providers: []
})
export class GoogleMapModule { }
