import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlateInfo } from '../interfaces/plate-info.interface';
import { PlateInfo } from '../data/plate-info.enum';

@Injectable({
  providedIn: 'root',
})
export class SearchPlateService {

  isLoading$ = new BehaviorSubject<boolean>(false);

  get isloading(): boolean {
    return this.isLoading$.value;
  }

  searchMockedPlateInfo(index: string): IPlateInfo | null {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 1000);
    return PlateInfo[index?.toLowerCase()] || null;
  }
}
