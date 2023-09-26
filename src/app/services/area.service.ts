import { Injectable } from '@angular/core';
import { IPlateItem } from '../interfaces/plate-item.interface';
import { IAreaShort } from '../interfaces/area.interface';

@Injectable({
  providedIn: 'root',
})
export class AreasService {
  cityAreaPhrase = 'Miasto na prawach powiatu';

  isAreaNamedByCapital(plateItem: IPlateItem): boolean {
    return (
      plateItem.area?.capital?.title?.charAt(0) ===
      plateItem.area?.title?.charAt(0)
    );
  }

  isCityArea(plateItem: IPlateItem): boolean {
    return plateItem.area?.capital?.title.includes(this.cityAreaPhrase);
  }

  isAreaShortNamedByCapital(area: IAreaShort): boolean {
    return area?.capital?.charAt(0) === area?.title?.charAt(0);
  }

  isCityAreaShort(area: IAreaShort): boolean {
    return area?.capital?.includes(this.cityAreaPhrase);
  }
}
