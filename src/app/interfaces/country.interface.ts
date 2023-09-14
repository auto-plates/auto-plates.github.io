import { IDefaultItem } from './default-item.interface';

export interface ICountry extends IDefaultItem {
  isoCode: string;
  flag: string;
}
