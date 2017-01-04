import { Injectable, Component } from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {api_url} from '../config';

@Injectable()
export class AuthService {
    protected base_url = api_url;
    public isConnected: boolean;
    public accessToken: string;
    private clientId: string = 'bJeSCIWpvjbYCuXZNxMzVz0wglX8mHR2ZTKHxaDv';
    private clientSecret: string =
    'XjbfZS6Apq05PDTSL4CoFHGo7NsKVAa1XMVrVElk5N1t0dOSyqxrHPff6okAi6X6Du9XxrK4dl0mLQ0YlscJsjnL5IKhQagQdGv2SgumhYRFaMi6LtHNPXicmMr8oLdy';

    constructor(public http: Http) {
        this.checkIfPreviouslyAuthentificated();
    };

    checkIfPreviouslyAuthentificated() {
        var accessToken = localStorage.getItem('sigmaAccessToken');
        if (accessToken !== null) {
            this.accessToken = accessToken;
            this.isConnected = true;
            return true;
        } else {
            return false;
        }
    }

    authentificate(username, password) {
        var params = 'grant_type=password&username=' + username + '&password=' + password;

        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
        headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var request = this.http.post(this.base_url + 'o/token/',
            params,
            { headers: headers }
        ).share();

        request.subscribe(
            (res: Response) => {
                this.accessToken = res.json().access_token;
                localStorage.setItem('sigmaAccessToken', this.accessToken);
                this.isConnected = true;
            },
            err => console.log('Erreur de mot de passe')
        );

        return request;
    }

    logout() {
        this.accessToken = undefined;
        this.isConnected = false;
        localStorage.setItem('sigmaAccessToken', '');
        location.reload();
    }

    isAuthenticated() {
        return this.isConnected;
    }

    appendAuth(header: Headers) {
        header.append('Authorization', 'Bearer ' + this.accessToken);
    }
}
