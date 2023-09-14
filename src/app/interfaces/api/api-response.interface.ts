import { IApiMeta } from './api-meta.interface';

export class IApiResponse<T> {
  meta?: IApiMeta;
  success?: boolean;
  results: T[];
}
