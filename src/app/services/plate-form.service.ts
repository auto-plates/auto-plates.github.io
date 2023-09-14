import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlateFormService {
  plateFormValue$ = new BehaviorSubject<string>(null);

  get plateFormValue(): string {
    return this.plateFormValue$.value;
  }

  disconnect(): void {
    this.plateFormValue$?.complete();
  }
}
