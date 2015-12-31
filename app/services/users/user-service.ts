import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {AuthService} from './auth-service';
import {User} from './user';

@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class UserService {
    public users:User[];

    constructor(public http:Http, public auth:AuthService) {
    };

    getUsers() {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');

        var request = this.http.get('http://localhost:8000/user/',
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la récupération des utilisateurs')
        );

        return request;
    }

    getUser(id: string) {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');

        var request = this.http.get('http://localhost:8000/user/'+ id + '/',
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la récupération de l\'utilisateur')
        );

        return request;
    }

    editUser(user:User) {
        var requestBody = 'email='+user.email+
            '&lastname='+user.lastname+
            '&firstname='+user.firstname+
            '&phone='+user.phone;

        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var request = this.http.put('http://localhost:8000/user/'+ user.id + '/',
            requestBody,
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la modification du profil de l\'utilisateur')
        );

        return request;
    }

    getMe() {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');

        var request = this.http.get('http://localhost:8000/user/me/',
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la récupération de l\'utilisateur')
        );

        return request;
    }
}
