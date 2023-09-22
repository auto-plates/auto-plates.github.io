import { IDistrict } from './district.interface';

export interface ICapital {
  districts: IDistrict[];
  title: string;
}

export interface ICapitalShort {
  title: string;
}

