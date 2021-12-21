import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { UsersOnline } from './models/users-online';

@Injectable({
    providedIn: 'root'
})
export class AuthenticantionService {
    private readonly KEY_TOKEN = 'tk-messages';
    private readonly KEY_TOKEN_HUB = 'tk-messages-hub';

    private hub: HubConnection;

    private authenticatonUpdated = new Subject<boolean>();
    private usersOnlineUpdated = new Subject<UsersOnline[]>();

    readonly authenticatonStation: Observable<boolean>;
    readonly usersOnlineObs: Observable<UsersOnline[]>;

    constructor(
        private http: HttpClient,
        private cookieService: CookieService) {
      this.authenticatonStation = new Observable(observer => {
        this.authenticatonUpdated.subscribe(isAuthenticated => {
          observer.next(isAuthenticated);
        });
      });

      this.usersOnlineObs = new Observable(observer => {
        this.usersOnlineUpdated.subscribe(array => {
          observer.next(array);
        });
      });
    }

    checkAuthenticated(): boolean {
      const isAuthenticated = (this.getToken() || '').trim() != '';

      this.authenticatonUpdated.next(isAuthenticated);
      if(isAuthenticated) {
        this.getUsersOnline();
      }

      return isAuthenticated;
    }

    getToken() {
        return this.cookieService.get(this.KEY_TOKEN);
    }

    getTokenHub() {
      return this.cookieService.get(this.KEY_TOKEN_HUB);
  }

    deleteToken() {
      this.cookieService.delete(this.KEY_TOKEN);
      this.cookieService.delete(this.KEY_TOKEN_HUB);

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
          tokenHub: string,
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
              this.cookieService.set(this.KEY_TOKEN_HUB, resultData.tokenHub, expiredDate);
            }
            else {
              errorMessage = resultData.message;
            }

            observer.next({
              wasAuthenticated: wasAuthenticated, errorMessage: errorMessage
            });

            if(wasAuthenticated) {
              this.createHubConnection();
            }
          }
        })
      });
    }

    logout() {
        this.deleteToken();

        if(this.hub != null){
          this.hub.stop();
        }
    }

    private createHubConnection() {
      this.hub = new HubConnectionBuilder()
        .withUrl('https://localhost:44370/hubs/server', {
          accessTokenFactory: () => this.getTokenHub(),
          withCredentials: false
        })
        .withAutomaticReconnect()
        .build();

      this.hub
        .start()
        .catch(error => {
          console.log(error);
        });

      this.hub.on('UserIsOnline', () => {
        this.getUsersOnline();
      });

      this.hub.on('UserIsOffline', () => {
        this.getUsersOnline();
      })
    }

    private getUsersOnline() {
      this.http.get<{ users: UsersOnline[] }>('https://localhost:44370/users/authentications/users-online/1')
      .subscribe({
        next: data => {
          this.usersOnlineUpdated.next(data.users);
        }
      })
    }
}
