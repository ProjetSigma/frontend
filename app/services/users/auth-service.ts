import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';

@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class AuthService {
    public isConnected;
    private clientId = 'Bziiu7E0wFtNre6TLdSnEqIe73prHbjJsPx3p5rL';
    private clientSecret = '8QCDHhiwwAEA5RIwuta8SpprcoJPmpfIwhkPNZil8wJqeLuAh6BKsvWVxNkFvg5YgO0aFrsYngY7YK77iil9f4jRFNSBX11XCe0iGTUd0o9HKCvj72twl0qMT6hlJp3l';
    public accessToken;

    constructor(public http:Http) {
        var token: string = localStorage.getItem('accessToken');
        if (token !== null && token !== '') {
            this.accessToken = token;
            this.isConnected = true;
        }
    }

    authentificate(username,password) {
        var params = 'grant_type=password&username='+username+'&password='+password;

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.clientId+':'+this.clientSecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var request = this.http.post('http://localhost:8000/o/token/',
            params,
            {headers:headers}
        );

        request.subscribe(
            (res:Response) => {
                this.accessToken = res.json().access_token;
                localStorage.setItem('accessToken', this.accessToken);
            },
            err => console.log('Erreur de mot de passe')
        );

        return request;
    }

    logout() {
        this.accessToken = undefined;
        localStorage.setItem('accessToken', '');
    }

    isAuthenticated() {
        return this.accessToken !== undefined;
    }
}
