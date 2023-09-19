import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PlateInfoList } from '../data/plate-info.enum';
import { Regions } from '../data/regions.enum';
import { IRegion } from '../interfaces/region.interface';

@Injectable()
export class RegionsService {

  getRegionsMocked = (): Observable<IRegion[]> => {
    return of(Regions);
  }
}
