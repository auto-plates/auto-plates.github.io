import { Component } from '@angular/core';
import { ThemesEnum } from './data/theme.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoading: boolean;
  theme: ThemesEnum = ThemesEnum.LIGHT;
  themesEnum = ThemesEnum;

  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  startAndStopSpinner(timeout = 800): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, timeout);
  }

  updateTheme(): void {
    this.theme = this.theme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
    console.log(this.theme);
    localStorage.setItem('theme', this.theme);
    const html = document.querySelector('html');
    html.setAttribute('data-bs-theme', this.theme);
  }
}
