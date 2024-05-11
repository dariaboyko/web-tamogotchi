import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  constructor(@Inject('API_URL') private apiUrl: string) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let { url } = request;
    const isAssets = url.includes('assets/');
    const isExternalApi = url.startsWith('http');
    url = isAssets || isExternalApi ? url : `${this.apiUrl}/${request.url}`;
    const apiReq = request.clone({ url });
    return next.handle(apiReq);
  }
}
