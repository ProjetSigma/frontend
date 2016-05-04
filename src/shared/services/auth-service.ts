import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {User} from '../resources/user';

@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class AuthService {
    protected base_url = 'http://localhost:8000/';
    public isConnected: boolean;
    public accessToken: string;
    public user: User = new User();
    private clientId:string = 'bJeSCIWpvjbYCuXZNxMzVz0wglX8mHR2ZTKHxaDv';
    private clientSecret:string =
    'XjbfZS6Apq05PDTSL4CoFHGo7NsKVAa1XMVrVElk5N1t0dOSyqxrHPff6okAi6X6Du9XxrK4dl0mLQ0YlscJsjnL5IKhQagQdGv2SgumhYRFaMi6LtHNPXicmMr8oLdy';

    constructor(public http:Http) {
        var token: string = localStorage.getItem('accessToken');
        if (token !== null && token !== '') {
            this.accessToken = token;
            this.isConnected = true;
            this.loadUser();
        }
    }

    loadUser() {
        var headers = new Headers();
        this.appendAuth(headers);
        headers.append('Accept', 'application/json');

        var request = this.http.get(this.base_url + 'user/me/',
            {headers:headers}
        );//.share(); // TODO: C'est quoi ce "share()" ? ^^
        request.subscribe(res => this.user = res.json());

        return request;
    }

    authentificate(username,password) {
        var params = 'grant_type=password&username='+username+'&password='+password;

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.clientId+':'+this.clientSecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var request = this.http.post(this.base_url + 'o/token/',
            params,
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => {
                this.accessToken = res.json().access_token;
                localStorage.setItem('accessToken', this.accessToken);
                this.isConnected = true;
                this.loadUser();
            },
            err => console.log('Erreur de mot de passe')
        );

        return request;
    }

    logout() {
        this.accessToken = undefined;
        this.isConnected = false;
        localStorage.setItem('accessToken', '');
    }

    isAuthenticated() {
        return this.isConnected;
    }

    appendAuth(header:Headers) {
        header.append('Authorization', 'Bearer ' + this.accessToken);
    }
}
