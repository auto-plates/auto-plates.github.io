import { IArea } from './area.interface';

export interface IRegion {
  title: string;
  areas: IArea[];
}

export interface IRegionBase {
  title: string;
}