import { Injectable, Component } from '@angular/core';
import {Http, Headers, URLSearchParams, Response} from '@angular/http';
import {api_url} from '../config';

class AuthInfo {
    public access_token: string;
    public refresh_token: string;
    public expires: number;
    
    constructor() {
        this.from_local_storage();
    }
    
    set(at:string, rt:string, exp:number) {
        this.access_token = at;
        this.refresh_token = rt;
        this.expires = exp;
        this.to_local_storage();
    }
    
    clear() {
        this.access_token = null;
        this.refresh_token = null;
        this.expires = null;
        this.to_local_storage();
    }
    
//*********************************************************************************************
    
    private locstorName: string = 'sigmaAuthInfo';
    
    to_local_storage() {
        localStorage.setItem(this.locstorName + "_access_token", this.access_token);
        localStorage.setItem(this.locstorName + "_refresh_token", this.refresh_token);
        localStorage.setItem(this.locstorName + "_expires", String(this.expires));
    }
    
    from_local_storage() {        
        this.access_token = localStorage.getItem(this.locstorName + "_access_token");
        this.refresh_token = localStorage.getItem(this.locstorName + "_refresh_token");
        this.expires = Number(localStorage.getItem(this.locstorName + "_expires"));
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

    constructor(public http: Http) {
        this.auth_info = new AuthInfo();
        this.connected = false;
        
        if(this.auth_info.refresh_token != null)
            this.refresh();
    };

    authenticate(username, password) {
        var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var params = 'grant_type=' + 'password' + '&username=' + username + '&password=' + password;
        var request = this.http.post(api_url + 'o/token/', params, {headers: headers}).subscribe(
            res => this.login(res),
            err => this.handle_error(err)
        );

        return request;
    }
    
    refresh() {
        var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(this.clientId + ':' + this.clientSecret));
            headers.append('Content-Type', 'application/x-www-form-urlencoded');

        var params = 'grant_type=' + 'refresh_token' + '&refresh_token=' + this.auth_info.refresh_token;
        var request = this.http.post(api_url + 'o/token/', params, {headers: headers}).subscribe(
            res => this.login(res),
            err => this.handle_error(err)
        );

        return request;
    }
    
    private error_cb: AuthErrorCallback[] = [];
    
    add_error_callback(cb) {
        this.error_cb.push(cb)
    }
    
    remove_error_callback(cb) {
        var i = this.error_cb.indexOf(cb);
        this.error_cb.splice(i, 1);
    }
    
    handle_error(err: Response) {
        console.log(err);
        var cb: AuthErrorCallback;
        for(cb of this.error_cb)
            cb(err)
        
        this.logout();
    }
    
//*********************************************************************************************
    
    token() {
        return this.auth_info.access_token;
    }
    
    is_authenticated() {
        return this.connected;
    }


//*********************************************************************************************
    
    login(resp : Response) {
        this.auth_info.set(
            resp.json().access_token,
            resp.json().refresh_token,
            (new Date()).getTime() + resp.json().expires_in
        );
        
        setTimeout(() => this.refresh, resp.json().expires_in / 2);
        if(this.unlogin_timeout != null) clearTimeout(this.unlogin_timeout);
        this.unlogin_timeout = setTimeout(() => this.logout, resp.json().expires_in);
        
        this.connected = true;
    }
    
    logout() {
        this.auth_info.clear();
        this.connected = false;
    }
    
}
