import { Injectable } from '@angular/core';
import { ControlOptionsEnum } from '../types/control-options.enum';
import { Observable, mergeMap, of } from 'rxjs';
import { IDefaultControl } from 'src/app/interfaces/default-control.interface';
import { CountriesApiService } from 'src/app/services/api/countries.api.service';
import { IDefaultItem } from 'src/app/interfaces/default-item.interface';

@Injectable({
  providedIn: 'root',
})
export class FormControlsOptionsService {
  constructor(private countriesApiService: CountriesApiService) {}

  getOptions = (
    optionsType: ControlOptionsEnum,
    _filters?: { [key: string]: number }
  ): Observable<IDefaultControl[]> => {
    switch (optionsType) {
      case ControlOptionsEnum.Countries:
        return this.countriesApiService
          .getCountries()
          .pipe(mergeMap(this.mapItemsToControlOptionsInterface));
      default:
        return of([]);
    }
  };

  mapItemsToControlOptionsInterface = (
    items: IDefaultItem[]
  ): Observable<IDefaultControl[]> => {
    return of(items.map(this.mapControlOption));
  };

  private mapControlOption = (option: IDefaultItem): IDefaultControl => {
    return {
      value: option.id,
      label: option.title,
    };
  };
}
