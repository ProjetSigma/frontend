import {Component} from 'angular2/core';
import {RestService} from '../rest.service';
import {AuthService} from '../auth-service';
import {Http} from 'angular2/http';
import {User} from './user';

@Component({})
export class UserService extends RestService {
    public users:User[];

    constructor(public http: Http, public auth: AuthService) {
        super(http, auth);
        this.useResource('user');
    }

    getUsers() {
        return this.authRequest()
            .logError('Erreur sur la récupération des utilisateurs')
            .get();
    }

    getUser(id: string) {
        return this.authRequest(id + '/')
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
        return this.authRequest(user.id + '/')
            .logError('Erreur sur la modification du profil de l\'utilisateur')
            .put(data);
    }

    getMe() {
        return this.authRequest('me/')
            .logError('Erreur sur la récupération de l\'utilisateur')
            .get();
    }
}
