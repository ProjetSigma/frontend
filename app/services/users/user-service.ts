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
        var data = this.filter(user, ['email', 'lastname', 'firstname', 'phone']);

        return this.authRequest(user.id + '/')
            .logError('Erreur sur la modification du profil de l\'utilisateur')
            .put(data);
    }

    editPassword(actualPassword:string, newPassword:string) {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');

        var request = this.http.put('http://localhost:8000/user/change_password/',
            JSON.stringify({old_password: actualPassword, password: newPassword}),
            {headers:headers}
        ).share();

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la modification du mot de passe de l\'utilisateur')
        );

        return request;
    }

    getMe() {
        return this.authRequest('me/')
            .logError('Erreur sur la récupération de l\'utilisateur')
            .get();
    }
}
