import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AuthenticantionService } from './authenticaton.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authenticantionService: AuthenticantionService, private router: Router) {

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean> | Promise<boolean> | boolean {
        
        return this.canActivate(route, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<boolean> | Promise<boolean> | boolean {
        
        return this.authenticantionService.checkAuthenticated()
            .then (
                (authenticated: boolean) => {
                    if(authenticated) {
                        
                        if(state.url.indexOf('/auth') === -1) {
                            return true;
                        }
                        else {
                            this.router.navigate(['/']);
                            return false;
                        }
                    }
                    else if(state.url.indexOf('/auth') === -1) {
                        this.router.navigate(['/auth'], { queryParams: { path: state.url } });
                        return false;
                    }  
                    else {
                        return true;
                    }                  
                }
            );
    }
}