import {Component} from 'angular2/core';
import {RestService} from '../rest.service';
import {User} from './user';

@Component({
    providers: [RestService]
})
export class UserService {
    public users:User[];

    constructor(public rest: RestService) {
        this.rest = rest;
    }

    getUsers() {
        return this.rest
            .authRequest('http://localhost:8000/user/')
            .logError('Erreur sur la récupération des utilisateurs')
            .get();
    }

    getUser(id: string) {
        return this.rest
            .authRequest('http://localhost:8000/user/'+ id + '/')
            .logError('Erreur sur la récupération de l\'utilisateur')
            .get();
    }

    editUser(user:User) {
        // Equivalent to lodash filter on user...
        var data = {
            email: user.email,
            lastname: user.lastname,
            firstname: user.firstname,
            phone: user.phone
        };
        return this.rest
            .authRequest('http://localhost:8000/user/'+ user.id + '/')
            .logError('Erreur sur la modification du profil de l\'utilisateur')
            .put(data);
    }

    getMe() {
        return this.rest
            .authRequest('http://localhost:8000/user/me/')
            .logError('Erreur sur la récupération de l\'utilisateur')
            .get();
    }
}
