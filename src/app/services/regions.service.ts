import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRegion } from '../interfaces/region.interface';
import { Regions } from '../data/regions.enum';

@Injectable()
export class RegionsService {

  getRegionsMocked = (): Observable<IRegion[]> => {
    return of(Regions);
  }
}
