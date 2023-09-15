import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { IPlateInfo } from '../interfaces/plate-info.interface';
import { PlateInfoList } from '../data/plate-info.enum';
import { RandomPlateService } from './random-plate.service';

@Injectable({
  providedIn: 'root',
})
export class SearchPlateService {

  plateInfo$ = new BehaviorSubject<IPlateInfo>(null);

  get plateInfo(): IPlateInfo {
    return this.plateInfo$.value;
  }

  constructor(private randomPlateService: RandomPlateService) {}

  searchPlateInfoMocked(code: string): Observable<IPlateInfo> {
    return of(PlateInfoList.filter(item => item.code.toLowerCase() === code.toLowerCase())[0]);
  }

  searchPlateInfosByRegionMocked(region: string): Observable<IPlateInfo[]> {
    return of(PlateInfoList.filter(item => item.code.length > 1 && item.region === region))
  }

  getRandomSearchQueryMocked = (): Observable<IPlateInfo> => {
    const filteredPlates = PlateInfoList.filter(item => item.code.length > 1);
    return of(filteredPlates[this.randomPlateService.randomNumber(0, filteredPlates.length)]);
  }
}
