import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { GoogleMapComponent } from './google-map.component';
import { MaterialModule } from '../material/material.module';
import { GoogleMapStyleHelper } from 'src/app/helpers/google-map-style.helper';

@NgModule({
  declarations: [GoogleMapComponent],
  imports: [CommonModule, GoogleMapsModule, MaterialModule],
  exports: [GoogleMapComponent],
  providers: [GoogleMapStyleHelper],
})
export class GoogleMapModule {}
