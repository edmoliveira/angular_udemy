export class User {
    id: string;
    name: string;
    token: string;
    expiresTime: number;
}

export class UserAuthenticationReponse {
    constructor(public wasAuthorized, public hasError: boolean, public messagem: string) {

    }
}