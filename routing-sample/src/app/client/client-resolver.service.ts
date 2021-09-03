import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Client } from './clientModel';
import { ClientService } from '../clientService';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ClientResolver implements Resolve<Client> {
    constructor(private ClientService: ClientService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): 
        Observable<Client> | Promise<Client> | Client {
        const client = this.ClientService.getClients().find(item => item.id == route.params['id']);

        return client;
    }
}