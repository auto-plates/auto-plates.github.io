import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPlateInfo } from '../interfaces/plate-info.interface';
import { PlateInfo } from '../data/plate-info.enum';

@Injectable({
  providedIn: 'root',
})
export class SearchPlateService {

  isLoading$ = new BehaviorSubject<boolean>(false);
  plateInfo$ = new BehaviorSubject<IPlateInfo>(null);

  get isloading(): boolean {
    return this.isLoading$.value;
  }

  get plateInfo(): IPlateInfo {
    return this.plateInfo$.value;
  }

  searchMockedPlateInfo(index: string): IPlateInfo | null {
    this.isLoading$.next(true);
    setTimeout(() => {
      this.isLoading$.next(false);
    }, 1000);
    const result = PlateInfo[index?.toLowerCase()] || null;
    if (result) {
      this.plateInfo$.next(result);
    } else {
      this.plateInfo$.next(null);
    }
    return result;
  }

  getExampleSearchQuery(): string {
    const keys = Object.keys(PlateInfo).filter(item => item.length > 1);
    return keys[Math.floor(Math.random() * keys.length)];
  }
}
