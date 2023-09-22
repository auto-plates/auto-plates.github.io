import { Injectable } from '@angular/core';
import { IPlateItem } from '../interfaces/plate-item.interface';

@Injectable({
  providedIn: 'root',
})
export class AreasService {

  isAreaNamedByCapital(plateItem: IPlateItem): boolean {
    return plateItem.area?.capital?.title?.charAt(0) === plateItem.area?.title?.charAt(0);
  }
}
