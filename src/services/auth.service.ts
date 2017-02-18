import {Injectable, Component} from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';
import {Router}   from '@angular/router';

import {api_url} from '../config';

class AuthInfo {
    public access_token: string;
    public refresh_token: string;
    public expires: number;
    public save: boolean;
    
    private locstorName: string = 'sigmaAuthInfo';
    
    constructor() {
        this.access_token = localStorage.getItem(this.locstorName + "_access_token");
        this.refresh_token = localStorage.getItem(this.locstorName + "_refresh_token");
        this.save = Number(localStorage.getItem(this.locstorName + "_save")) > 0;
        
        let exp = localStorage.getItem(this.locstorName + "_expires");
        this.expires = (exp != null) ? Number(exp) : null;
    }
    
    set(at:string, rt:string, exp:number) {
        this.access_token = at;
        this.refresh_token = rt;
        this.expires = exp;
        
        localStorage.setItem(this.locstorName + "_access_token", this.access_token);
        localStorage.setItem(this.locstorName + "_expires", String(this.expires));
        localStorage.setItem(this.locstorName + "_expires", String(this.save ? 1 : 0));
        localStorage.setItem(this.locstorName + "_refresh_token", this.refresh_token);
    }
    
    clear() {
        this.access_token = null;
        this.refresh_token = null;
        this.expires = null;
        this.save = false;
        
        localStorage.removeItem(this.locstorName + "_access_token");
        localStorage.removeItem(this.locstorName + "_refresh_token");
        localStorage.removeItem(this.locstorName + "_expires");
        localStorage.removeItem(this.locstorName + "_save");
    }
    
}

//*********************************************************************************************

export interface AuthErrorCallback {
    (err: Response): void;
};
    
@Injectable()
export class AuthService {
    
    private clientId: string = 'bJeSCIWpvjbYCuXZNxMzVz0wglX8mHR2ZTKHxaDv';
    private clientSecret: string =
    'XjbfZS6Apq05PDTSL4CoFHGo7NsKVAa1XMVrVElk5N1t0dOSyqxrHPff6okAi6X6Du9XxrK4dl0mLQ0YlscJsjnL5IKhQagQdGv2SgumhYRFaMi6LtHNPXicmMr8oLdy';
    
    public connected: boolean;
    private auth_info: AuthInfo;
    private unlogin_timeout;

    constructor(public http: Http, private router: Router) {
        this.auth_info = new AuthInfo();
        this.connected = false;
        
        var t = (new Date).getTime();        
        if(this.auth_info.expires != null && this.auth_info.expires < t) {
            this.connected = true;
            setTimeout(() => this.refresh, (t - this.auth_info.expires) / 2);
            this.unlogin_timeout = setTimeout(() => this.logout, (t - this.auth_info.expires));
        }
        
        else if(this.auth_info.refresh_token != null)
            this.refresh();
    };

    authenticate(username, password) : Promise<Response> {
        var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var params = 'grant_type=' + 'password' + '&username=' + username + '&password=' + password;
        var request = this.http.post(api_url + 'o/token/', params, {headers: headers}).toPromise().then(
            (res) => this.handleAuth(res),
            (err) => this.handleError(err)
        );

        return request;
    }
    
    refresh() : Promise<Response> {
        var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var params = 'grant_type=' + 'refresh_token' + '&refresh_token=' + this.auth_info.refresh_token;
        var request = this.http.post(api_url + 'o/token/', params, {headers: headers}).toPromise().then(
            (res) => this.handleAuth(res),
            (err) => this.handleError(err)
        );

        return request;
    }
    
    handleAuth(resp : Response) : Promise<Response> {
        this.auth_info.set(
            resp.json().access_token,
            resp.json().refresh_token,
            (new Date()).getTime() + resp.json().expires_in
        );
        
        setTimeout(() => this.refresh, resp.json().expires_in / 2);
        if(this.unlogin_timeout != null) clearTimeout(this.unlogin_timeout);
        this.unlogin_timeout = setTimeout(() => this.logout, resp.json().expires_in);
        
        this.connected = true;
        
        return Promise.resolve(resp);
    }
    
    handleError(err: Response) : Promise<Response> {
        this.logout();
        return Promise.reject(err);
    }
    
//*********************************************************************************************
    
    token() {
        return this.auth_info.access_token;
    }
    
    isAuthenticated() {
        return this.connected;
    }


//*********************************************************************************************
    
    logout() {
        this.auth_info.clear();
        this.connected = false;
        this.router.navigate(['login']);
    }
    
}
