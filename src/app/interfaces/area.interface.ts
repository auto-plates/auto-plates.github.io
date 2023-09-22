import { ICapital } from './capital.interface';

export interface IArea {
  capital: ICapital;
  title: string;
}

export interface IAreaShort {
  code: string;
  capital: string;
  title: string;
}
