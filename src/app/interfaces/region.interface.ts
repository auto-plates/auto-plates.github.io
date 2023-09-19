import { IArea } from './area.interface';

export interface IRegion {
  title: string;
  areas: IArea[];
  code: string;
}

export interface IRegionBase {
  title: string;
}