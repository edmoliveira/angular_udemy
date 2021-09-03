import { Observable } from 'rxjs';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

export interface ComponentCanDeactivateGuard {
    canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateGuard implements CanDeactivate<ComponentCanDeactivateGuard> {
    canDeactivate(
        component: ComponentCanDeactivateGuard
        , currentRoute: ActivatedRouteSnapshot
        , currentState: RouterStateSnapshot
        , nextState?: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        return component.canDeactivate();
    }
}