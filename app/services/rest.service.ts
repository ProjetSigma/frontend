import {Component} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {AuthService} from './auth-service';


class RestRequest {
    public headers: Headers;
    public url: string;
    public error_message: string;
    private _request : any;//Observable<Response>;
    private _rest: RestService; // DI

    constructor(url: string, headers: Headers, service: RestService) {
        this.url = url;
        this.headers = headers;
        this._rest = service;
    }

    public logError(message: string) {
        this.error_message = message;
        return this;
    }

    public get() {
        this._request = this._rest.http.get(this.url, {headers: this.headers});
        this._attach();
        return this._request;
    }

    public delete() {
        this._request = this._rest.http.delete(this.url, {headers: this.headers});
        this._attach();
        return this._request;
    }

    public head() {
        this._request = this._rest.http.head(this.url, {headers: this.headers});
        this._attach();
        return this._request;
    }

    public post(data) {
        this._addPostHeader();
        this._request = this._rest.http.post(this.url, this._data(data), {headers: this.headers});
        this._attach();
        return this._request;
    }

    public put(data) {
        this._addPostHeader();
        this._request = this._rest.http.put(this.url, this._data(data), {headers: this.headers});
        this._attach();
        return this._request;
    }

    public patch(data) {
        this._addPostHeader();
        this._request = this._rest.http.patch(this.url, this._data(data), {headers: this.headers});
        this._attach();
        return this._request;
    }

    private _addPostHeader() {
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }
    private _attach() {
        this._request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log(this.error_message)
        );
        return this;
    }

    // TODO add URLEncode
    private _data(data) {
        var body  = '';
        var first = true;
        for(var i in data) {
            if(!first) {
                body += '&';
            }
            body += i + '=' + data[i];
            first = false;
        }
        return body;
    }

}


@Component({
    providers: [Http, HTTP_PROVIDERS]
})
export class RestService {
    constructor(public http:Http, public auth:AuthService) {
    };

    authRequest(url: string) {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');

        return new RestRequest(url, headers, this);
    }
}
