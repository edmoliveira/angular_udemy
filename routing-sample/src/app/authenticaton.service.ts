import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthenticantionService {
    onState: EventEmitter<boolean> = new EventEmitter();

    constructor() {
        this.onState.emit(this.getLoggedIn());
    }

    checkAuthenticated() {
        return this.getLoggedIn();
    }

    isAuthenticated() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.getLoggedIn());
                }, 10);
            }
        )
    }

    login() {
        localStorage.setItem('angLogin', 'true');
        this.onState.emit(this.getLoggedIn());
    }

    logout() {
        localStorage.setItem('angLogin', 'false');
        this.onState.emit(this.getLoggedIn());
    }

    private getLoggedIn(): boolean {
        return localStorage.getItem('angLogin') === 'true';
    }
}