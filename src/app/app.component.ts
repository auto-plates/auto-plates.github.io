import { Component, OnInit } from '@angular/core';
import { ThemesEnum } from './data/theme.enum';
import { BuildService } from './services/build.service';
import { PlateFormService } from './services/plate-form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isLoading: boolean;
  theme: ThemesEnum = ThemesEnum.LIGHT;
  themesEnum = ThemesEnum;

  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  constructor(private buildService: BuildService) {}

  ngOnInit(): void {
    this.buildService.isNodeJsBuild$.next(false);
  }

  startAndStopSpinner(timeout = 800): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, timeout);
  }

  updateTheme(): void {
    this.theme = this.theme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
    localStorage.setItem('theme', this.theme);
    const html = document.querySelector('html');
    html.setAttribute('data-bs-theme', this.theme);
  }
}
