import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { AppVersionComponent } from './components/app-version/app-version.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HeaderComponent, AppVersionComponent],
  imports: [CommonModule, MaterialModule],
  exports: [HeaderComponent],
  providers: [],
})
export class HeaderModule {}
