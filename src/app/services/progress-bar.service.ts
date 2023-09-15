import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProgressBarService {

  isLoadInProgress$ = new BehaviorSubject<boolean>(false);
  localProgressTime = 1000;

  get isloading(): boolean {
    return this.isLoadInProgress$.value;
  }

  startProgress(): void {
    this.isLoadInProgress$.next(true);
  }

  stopProgress(): void {
    this.isLoadInProgress$.next(false);
  }
}
