import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthenticantionService } from './authenticaton.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
    constructor(private authenticantionService: AuthenticantionService, private router: Router) {

    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        return this.canActivate(route, state);
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
        if(this.authenticantionService.checkAuthenticated()) { return true; }

        return this.router.createUrlTree(['/auth'], { queryParams: { path: state.url } });
    }
}