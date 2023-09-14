import { Injectable } from '@angular/core';
import { ApiProvider } from '../../providers/api.provider';
import { Observable } from 'rxjs';
import { ICountry } from 'src/app/interfaces/country.interface';
import { IApiRequest } from 'src/app/interfaces/api/api-request.interface';

@Injectable({
  providedIn: 'root',
})
export class CountriesApiService {
  private readonly api = 'countries';

  constructor(private apiProvider: ApiProvider) {}

  getCountries = (): Observable<ICountry[]> => {
    const model = new IApiRequest<void>(this.api);

    return this.apiProvider.get(model);
  };
}
