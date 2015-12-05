import {Component} from 'angular2/angular2';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {AuthService} from './auth-service';
import {User} from './user';

@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class UserService {
    public users;

    constructor(public http:Http, public auth:AuthService) {
    };

    getUsers() {
        var headers = new Headers();
        headers.append('Authorization', 'Bearer ' + this.auth.accessToken);

        var request = this.http.get('http://localhost:8000/user/',
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log('Erreur sur la récupération des utilisateurs')
        );

        return request;
    }
}
