import { IArea } from './area.interface';
import { IRegionShort } from './region.interface';

export interface IPlateItem {
  code: string;
  area: IArea;
  promoPlates: string[];
  region: IRegionShort;
}
