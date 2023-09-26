import { Component, OnInit } from '@angular/core';
import { ThemesEnum } from './data/theme.enum';
import { BuildService } from './services/build.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  theme: ThemesEnum = ThemesEnum.LIGHT;
  themesEnum = ThemesEnum;

  get isDarkTheme(): boolean {
    return this.theme === 'dark';
  }

  constructor(private buildService: BuildService) {}

  ngOnInit(): void {
    this.buildService.isNodeJsBuild$.next(false);
  }

  updateTheme(): void {
    this.theme =
      this.theme === ThemesEnum.DARK ? ThemesEnum.LIGHT : ThemesEnum.DARK;
    localStorage.setItem('theme', this.theme);
    const html = document.querySelector('html');
    html.setAttribute('data-bs-theme', this.theme);
  }
}
