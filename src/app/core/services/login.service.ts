import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Observable, catchError, throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import {
  AccessTokenName,
  IDecodedToken,
  ISignInPayload,
  ISignUpPayload,
  ITokenResponse,
  RefreshTokenName,
} from '..';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    @Inject('IDENTITY_URL') private identityUrl: string
  ) {}

  private signInURI = this.identityUrl + '/login';
  private signUpURI = this.identityUrl + '/register';
  private options = { headers: new HttpHeaders().set('Content-Type', 'application/json') };

  public login(payload: ISignInPayload): Observable<ITokenResponse> {
    return this.httpClient.post<ITokenResponse>(
      this.signInURI,
      JSON.stringify(payload),
      this.options
    );
  }

  public register(payload: ISignUpPayload): Observable<ITokenResponse> {
    return this.httpClient.post<ITokenResponse>(
      this.signUpURI,
      JSON.stringify(payload),
      this.options
    );
  }

  public setToken(token: string): void {
    this.cookieService.set(AccessTokenName, token);
  }

  public setRefreshToken(refreshToken: string): void {
    this.cookieService.set(RefreshTokenName, refreshToken);
  }

  public getToken(): string {
    return this.cookieService.get(AccessTokenName);
  }

  public getRefreshToken(): string {
    return this.cookieService.get(RefreshTokenName);
  }

  public logout(): void {
    this.cookieService.deleteAll();
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  public shouldRefreshToken(): boolean {
    const accessToken = this.cookieService.get(AccessTokenName);
    const expirationDate = this.getExpirationDate(accessToken);
    if (!expirationDate) return true;
    const oneHour = 60 * 60 * 1000;
    const currentTimeInUtc = new Date().toUTCString();
    const currentTimeInUtcMilliseconds = Date.parse(currentTimeInUtc);
    return (
      expirationDate &&
      expirationDate.getTime() - currentTimeInUtcMilliseconds < oneHour
    );
  }

  public refreshToken(): Observable<ITokenResponse> {
    const refreshToken = this.cookieService.get('refresh_token');
    const body = new URLSearchParams();
    body.set('refresh_token', refreshToken);

    return this.httpClient
      .post<ITokenResponse>(this.signInURI, body.toString())
      .pipe(
        catchError(error => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  private getExpirationDate(token: string): Date | null {
    const decodedToken = this.decodeToken(token);
    if (decodedToken && decodedToken.exp) {
      return new Date(decodedToken.exp * 1000);
    }
    return null;
  }

  private decodeToken(token: string): IDecodedToken | null {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}
