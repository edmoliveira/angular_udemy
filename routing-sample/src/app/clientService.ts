import { Injectable } from '@angular/core';
import { Client } from './client/clientModel';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    private clients: Client[] = [
        new Client(1, 'Mark')
        , new Client(2, 'Jacob')
        , new Client(3, 'Larry')
    ];

    getClients() {
        return this.clients.slice();
    }
}