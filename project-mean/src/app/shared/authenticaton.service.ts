import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthenticantionService {
    private readonly KEY_TOKEN = 'tk-messages';
    private authenticatonUpdated = new Subject<boolean>();

    readonly authenticatonStation: Observable<boolean>;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService) {
      this.authenticatonStation = new Observable(observer => {
        this.authenticatonUpdated.subscribe(isAuthenticated => {
          observer.next(isAuthenticated);
        });
      });
    }

    checkAuthenticated(): boolean {
      const isAuthenticated = (this.getToken() || '').trim() != '';

      this.authenticatonUpdated.next(isAuthenticated);

      return isAuthenticated;
    }

    getToken() {
        return this.cookieService.get(this.KEY_TOKEN);
    }

    deleteToken() {
      this.cookieService.delete(this.KEY_TOKEN);

      this.authenticatonUpdated.next(false);
    }

    regiterUser(email: string, password: string): Observable<{
      wasCreated: boolean, errorMessage: string
    }> {
      return new Observable((observer) => {
        const data = {
          email: email,
          password: password
        }

        this.http.post<{
          hasError: boolean,
          message: string
        }>('http://localhost:3000/api/users/register', data)
        .subscribe({
          error: error => {
            observer.next({
              wasCreated: false, errorMessage: error.error.message
            });
          },
          next: resultData => {
            observer.next({
              wasCreated: !resultData.hasError, errorMessage: resultData.message
            });
          }
        })
      });
    }

    login(email: string, password: string): Observable<{
      wasAuthenticated: boolean, errorMessage: string
    }> {
      return new Observable((observer) => {
        const data = {
          email: email,
          password: password
        }

        this.http.post<{
          hasError: boolean,
          message: string,
          token: string,
          expiresIn: number
        }>('http://localhost:3000/api/users/sign-in', data)
        .subscribe({
          error: error => {
            observer.next({
              wasAuthenticated: false, errorMessage: error.error.message
            });
          },
          next: resultData => {
            let wasAuthenticated: boolean = false;
            let errorMessage: string = '';

            if(!resultData.hasError){
              wasAuthenticated = true;

              let expiredDate = new Date();

              expiredDate.setSeconds(expiredDate.getSeconds() + resultData.expiresIn);

              this.cookieService.set(this.KEY_TOKEN, resultData.token, expiredDate);
            }
            else {
              errorMessage = resultData.message;
            }

            observer.next({
              wasAuthenticated: wasAuthenticated, errorMessage: errorMessage
            });
          }
        })
      });
    }

    logout() {
        this.deleteToken();
    }
}
