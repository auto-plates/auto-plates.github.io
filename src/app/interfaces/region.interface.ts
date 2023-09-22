import { IAreaShort } from './area.interface';

export interface IRegion {
  areas: IAreaShort[];
  capital: string;
  code: string;
  title: string;
}
export interface IRegionShort {
  capital: string;
  code: string;
  title: string;
}
