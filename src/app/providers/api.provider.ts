import { Injectable } from '@angular/core';
import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigProvider } from './config.provider';
import { IApiRequest } from '../interfaces/api/api-request.interface';
import { IApiResponse } from '../interfaces/api/api-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiProvider {
  get api(): string {
    return this.configProvider.api;
  }

  constructor(private http: HttpClient, private configProvider: ConfigProvider) {}

  get = <T>(model: IApiRequest<void>, context?: HttpContext): Observable<T> => {
    return this.http.get<T>(`${this.api}/${model.path}`, {
      params: model.query,
      context: context || new HttpContext(),
      withCredentials: true,
    });
  };

  getList = <T>(model: IApiRequest<void>): Observable<IApiResponse<T>> => {
    return this.http.get<IApiResponse<T>>(`${this.api}/${model.path}`, {
      params: model.query,
      withCredentials: true,
    });
  };

  post = <B, T>(model: IApiRequest<B>, context?: HttpContext): Observable<T> => {
    return this.http.post<T>(`${this.api}/${model.path}`, model.body, {
      withCredentials: true,
      context: context || new HttpContext(),
      params: model.query,
    });
  };

  postWithoutResponse = <B, T>(model: IApiRequest<B>, context?: HttpContext): Observable<HttpResponse<T>> => {
    return this.http.post<T>(`${this.api}/${model.path}`, model.body, {
      withCredentials: true,
      context: context || new HttpContext(),
      params: model.query,
      observe: 'response',
    });
  };

  postFile = <B>(model: IApiRequest<B>): Observable<Blob> => {
    return this.http.post(`${this.api}/${model.path}`, model.body, { withCredentials: true, responseType: 'blob' });
  };

  getFile = <B>(model: IApiRequest<B>): Observable<Blob> => {
    return this.http.get(`${this.api}/${model.path}`, {
      params: model.query,
      withCredentials: true,
      responseType: 'blob',
    });
  };

  patch = <B, T>(model: IApiRequest<B>): Observable<T> => {
    return this.http.patch<T>(`${this.api}/${model.path}`, model.body, { withCredentials: true });
  };

  put = <B, T>(model: IApiRequest<B>, context?: HttpContext): Observable<T> => {
    return this.http.put<T>(`${this.api}/${model.path}`, model.body, {
      params: model.query,
      context: context || new HttpContext(),
      withCredentials: true,
    });
  };

  delete = <T>(model: IApiRequest<void>): Observable<T> => {
    return this.http.delete<T>(`${this.api}/${model.path}`, { withCredentials: true });
  };

  deleteWithBody = <B, T>(model: IApiRequest<B>): Observable<T> => {
    return this.http.delete<T>(`${this.api}/${model.path}`, { withCredentials: true, body: model.body });
  };
}
