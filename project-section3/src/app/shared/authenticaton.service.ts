import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { BaseService } from './base.service';
import { DataStorageService } from './data-storage.service';
import { ResultService } from './result-service.model';
import { User, UserAuthenticationReponse } from './userModel';

@Injectable({
    providedIn: 'root'
})
export class AuthenticantionService extends BaseService {
    private userData: User;
    private wasLoading: boolean = false;

    onState: Subject<UserAuthenticationReponse> = new Subject();

    constructor(
        private http: HttpClient, 
        private cookieService: CookieService,
        private dataStorageService: DataStorageService) {
        super();
    }

    checkAuthenticated() {
        return new Promise(
            (resolve, reject) => {
                resolve(this.getLoggedIn());
            }
        )
    }

    login(email: string, password: string) {
        const data = { 
            email: email, password: password 
        };

        this.http.post<ResultService<User>>(
            "http://localhost:9000/api/login",
            data
        ).subscribe(result => {
            this.getResponse<User>(
                result, 
                data => {
                    this.userData = data;

                    let expiredDate = new Date();
                    
                    expiredDate.setSeconds(expiredDate.getSeconds() + data.expiresTime);
                    
                    this.cookieService.set('tk-app', data.token, expiredDate);

                    if(!this.wasLoading) {
                        this.dataStorageService.fetchData();
                        this.wasLoading = true;
                    }

                    this.onState.next(new UserAuthenticationReponse(true, false, null));
                },
                errorMessage => {
                    this.onState.next(new UserAuthenticationReponse(false, true, this.manageHttpError(errorMessage)));
                }
            );
        }, 
        error => {
            if(error.status === 401) {
                this.onState.next(new UserAuthenticationReponse(false, false, 'Unauthorized!'));
            }                        
            else {
                this.onState.next(new UserAuthenticationReponse(false, true, this.manageHttpError(error)));
            }
        });
    }

    logout() {
        this.cookieService.delete('tk-app')
    }

    getUserData(): Observable<User> {
        return new Observable((observer) => {
            const loggedIn: boolean = this.getLoggedIn();

            if(loggedIn) {
                if(this.userData != null) {
                    observer.next(this.userData);
                }
                else {
                    this.http.get<ResultService<User>>(
                        "http://localhost:9000/api/user"
                    ).subscribe(result => {
                        this.getResponse<User>(
                            result, 
                            data => {
                                this.userData = data;

                                if(!this.wasLoading) {
                                    this.dataStorageService.fetchData();
                                    this.wasLoading = true;
                                }

                                observer.next(this.userData);
                            },
                            errorMessage => {
                                observer.error(this.manageHttpError(errorMessage));
                            }
                        );
                    }, 
                    error => {
                        observer.error(this.manageHttpError(error));
                    });
                }
            }    
            else {
                observer.error(null);
            }        
        });
    }

    getToken() {
        return this.cookieService.get('tk-app');
    }

    deleteToken() {
        this.cookieService.delete('tk-app');
    }

    private getLoggedIn(): boolean {
        return (this.getToken() || '').trim() != '';
    }
}