import { Component } from '@angular/core';
import { ThemesEnum } from 'src/app/data/theme.enum';

@Component({
  selector: 'app-version',
  templateUrl: './app-version.component.html',
  styleUrls: ['./app-version.component.scss'],
})
export class AppVersionComponent {
  version = '2.2';
  theme: ThemesEnum = ThemesEnum.LIGHT;
}
