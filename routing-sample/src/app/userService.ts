import { Injectable } from '@angular/core';
import { User } from './users/UserModel';
import { ClientService } from './clientService';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private users: User[];

    constructor(clientService: ClientService) {
        const clients = clientService.getClients();

        this.users = [
            new User(1, 'Mark', 'Otto', 'mark.otto@gmail.com', clients[0])
            , new User(2, 'Jacob', 'Thornton', 'jacob.thornton@gmail.com', clients[1])
            , new User(3, 'Larry', 'the Bird', 'larry.bird@gmail.com', clients[2])
        ];
    }

    getUsers() {
        return this.users.slice();
    }
}