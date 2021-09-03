import { Injectable } from '@angular/core';
import { Server } from './servers/serverModel';

@Injectable({
    providedIn: 'root'
})
export class ServerService {
    private servers: Server[] = [
        new Server(1, 'New York', false)
        , new Server(2, 'Toronto', true)
        , new Server(3, 'São Paulo', true)
        , new Server(4, 'Lisboa', false)
    ];

    getServers() {
        return this.servers.slice();
    }
}