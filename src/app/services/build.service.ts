import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildService {
  isNodeJsBuild$ = new BehaviorSubject<boolean>(false);

  get isNodeJsBuild(): boolean {
    return this.isNodeJsBuild$.value;
  }

  disconnect(): void {
    this.isNodeJsBuild$?.complete();
  }
}
