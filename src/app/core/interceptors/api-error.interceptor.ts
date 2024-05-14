import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class ApiErrorInterceptor implements HttpInterceptor {
  constructor(private _snackBar: MatSnackBar) {}
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    {
      return next.handle(request).pipe(
        catchError(error => {
          this._snackBar.open(error.error, 'Close', {
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'snackbar__error',
            duration: 5000
          });
          return throwError(() => error);
        })
      );
    }
  }
}
