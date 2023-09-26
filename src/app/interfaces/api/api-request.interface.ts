import { HttpParams } from '@angular/common/http';

export class IApiRequest<T> {
  constructor(
    public path: string,
    public body?: T,
    public query?: HttpParams
  ) {}

  addToPath(value?: string | number | null, withoutSlash = false): this {
    this.path += `${withoutSlash ? '' : '/'}${value}`;
    return this;
  }

  addToQuery(
    param: string,
    value?: boolean | string | number | { [key: string]: any } | null
  ): this {
    if (value === null || value === undefined) {
      return this;
    }

    const stringifiedValue =
      typeof value === 'string' ? value : JSON.stringify(value);

    this.query = this.query
      ? this.query.set(param, stringifiedValue)
      : new HttpParams().set(param, stringifiedValue);

    return this;
  }

  addParamsToPath(
    param: string,
    value?: boolean | string | number | null
  ): this {
    if (value === null || value === undefined) {
      return this;
    }

    const hasParams = this.path.includes('?');
    const separator = hasParams ? '&' : '?';
    this.path += `${separator}${param}=${value}`;

    return this;
  }
}
