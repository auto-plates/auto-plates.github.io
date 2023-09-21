import { Injectable } from '@angular/core';

@Injectable()
export class RouteHelper {
  static readonly EMPTY_PATH = '';
  static readonly ROOT_PATH = '/';
  static readonly PLATES_LIST_PATH = 'plates-list';

  get dashboardUrl(): string[] {
    return [RouteHelper.ROOT_PATH, RouteHelper.EMPTY_PATH];
  }

  get ListUrl(): string[] {
    return [RouteHelper.ROOT_PATH, RouteHelper.PLATES_LIST_PATH];
  }
}
