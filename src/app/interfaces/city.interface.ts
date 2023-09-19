import { IDistrict } from './district.interface';

export interface ICity {
  districts: IDistrict[];
  title: string;
}
