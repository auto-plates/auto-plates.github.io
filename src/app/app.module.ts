import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EndingsPipe } from './pipes/endings.pipe';
import { FormsModule } from '@angular/forms';
import { HeaderModule } from './modules/header/header.module';
import { PlateFormModule } from './modules/plate-form/plate-form.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    EndingsPipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    HeaderModule,
    PlateFormModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
