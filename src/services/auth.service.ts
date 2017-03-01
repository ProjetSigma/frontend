import {Injectable, Component, APP_INITIALIZER} from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';
import {Router} from '@angular/router';

import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import {api_url} from '../config';

@Injectable()
export class AuthService {

    private clientId = 'bJeSCIWpvjbYCuXZNxMzVz0wglX8mHR2ZTKHxaDv';
    private clientSecret =
        'XjbfZS6Apq05PDTSL4CoFHGo7NsKVAa1XMVrVElk5N1t0dOSyqxrHPff6okAi6X6Du9XxrK4dl0mLQ0YlscJsjnL5IKhQagQdGv2SgumhYRFaMi6LtHNPXicmMr8oLdy';
    private locStorName = 'sigma_auth_token';

    private unlogin_timeout;
    private access_token: BehaviorSubject<string>;
    private refresh_token: string = null;

    private init_promise: Promise<any> = null;

    constructor(public http: Http) {
        this.refresh_token = localStorage.getItem(this.locStorName);
        this.access_token = new BehaviorSubject(null);
    };

    token(): string {
        return this.access_token.getValue();
    }

    tokenObs(): Observable<string> {
        return this.access_token.asObservable();
    }

    isAuthenticated(): Observable<boolean> {
        return this.tokenObs().map(token => (token != null));
    }

// ********************************************************************************************

    authenticate(username: string, password: string, save: boolean): Promise<Response> {
        const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = 'grant_type=' + 'password' + '&username=' + username + '&password=' + password;
        const request = this.http.post(api_url + 'o/token/', params, {headers: headers}).toPromise().then(
            (res) => this.handleAuth(res, save),
            (err) => this.handleError(err)
        );

        return request;
    }

    refresh(): Promise<Response> {
        const headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        const params = 'grant_type=' + 'refresh_token' + '&refresh_token=' + this.refresh_token;
        const request = this.http.post(api_url + 'o/token/', params, {headers: headers}).toPromise().then(
            (res) => this.handleAuth(res, true),
            (err) => this.handleError(err)
        );

        return request;
    }

    handleAuth(resp: Response, save: boolean): Promise<Response> {
        this.access_token.next(resp.json().access_token);
        this.refresh_token = resp.json().refresh_token;
        if (save) { localStorage.setItem(this.locStorName, this.refresh_token); }

        const exp = resp.json().expires_in;
        setTimeout(() => this.refresh, exp / 2);
        if (this.unlogin_timeout != null) { clearTimeout(this.unlogin_timeout); }
        this.unlogin_timeout = setTimeout(() => this.logout, exp);

        return Promise.resolve(resp);
    }

    handleError(err: Response): Promise<Response> {
        this.logout();
        return Promise.reject(err);
    }

    logout(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.access_token.next(null);
            this.refresh_token = null;
            localStorage.removeItem(this.locStorName);
            resolve();
        });
    }

// ********************************************************************************************
    init(): Promise<any> {
        if (this.init_promise == null) {
            this.init_promise = new Promise((resolve, reject) => {
                if (this.refresh_token == null) {
                    resolve();
                } else {
                    return this.refresh().then((resp) => {
                        resolve();
                    }, (err) => {
                        resolve();
                    });
                }
            });
        }
        return this.init_promise;
    }

}

export function AuthFactoryGen(auth: AuthService) {
    return () => auth.init();
}
export const AuthInitializer = {provide: APP_INITIALIZER, useFactory: AuthFactoryGen, deps: [AuthService, Http], multi: true};
