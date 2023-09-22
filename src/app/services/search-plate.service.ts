import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IPlateItem } from '../interfaces/plate-item.interface';
import { PlateInfoList } from '../data/plate-items.enum';
import { RandomPlateService } from './random-plate.service';

@Injectable({
  providedIn: 'root',
})
export class SearchPlateService {

  plateItem$ = new BehaviorSubject<IPlateItem>(null);

  get plateItem(): IPlateItem {
    return this.plateItem$.value;
  }

  constructor(private randomPlateService: RandomPlateService) {}

  searchPlateInfoMocked(code: string): Observable<IPlateItem> {
    return of(PlateInfoList.filter(item => item.code.toLowerCase() === code.toLowerCase())[0]);
  }

  searchPlateInfosByRegionCodeMocked(regionCode: string): Observable<IPlateItem[]> {
    return of(PlateInfoList.filter(item => item.code.length > 1 && item.code.charAt(0) === regionCode));
  }

  getRandomSearchQueryMocked = (): Observable<IPlateItem> => {
    const filteredPlates = PlateInfoList.filter(item => item.code.length > 1);
    return of(filteredPlates[this.randomPlateService.randomNumber(0, filteredPlates.length - 1)]);
  }
}
