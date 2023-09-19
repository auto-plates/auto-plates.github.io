import { IArea } from './area.interface';
import { ICity } from './city.interface';
import { IRegionBase } from './region.interface';

export interface IPlateInfo {
  area: IArea;
  city: ICity;
  code: string;
  promoPlates: string[];
  region: IRegionBase;
}
