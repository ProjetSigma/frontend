import {Component, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS, Headers, Response} from 'angular2/http';
import {AuthService} from './auth-service';
import {api_url} from '../../config.ts';


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
        this._request = this._rest.http.get(this.url, {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    public delete() {
        this._request = this._rest.http.delete(this.url, {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    public head() {
        this._request = this._rest.http.head(this.url, {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    public post(data) {
        this._addPostHeader();
        this._request = this._rest.http.post(this.url, this._data(data), {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    public upload(file) {
        var event = new EventEmitter();
        var fd = new FormData();
        fd.append('file', file);
        var req = new XMLHttpRequest();

        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                event.emit(true);
            }
        };

        req.open('post', this.url, true);
        req.setRequestHeader('Authorization', this.headers.get('Authorization'));
        req.send(fd);

        return event;
    }

    public put(data) {
        this._addPostHeader();
        this._request = this._rest.http.put(this.url, this._data(data), {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    public patch(data) {
        this._addPostHeader();
        this._request = this._rest.http.patch(this.url, this._data(data), {headers: this.headers});//share()();
        this._attach();
        return this._request;
    }

    private _addPostHeader() {
        this.headers.append('Content-Type', 'application/json');
    }
    private _attach() {
        this._request.subscribe(
            (res:Response) => console.log(res.json()),
            err => console.log(this.error_message)
        );
        return this;
    }

    private _data(data) {
        return JSON.stringify(data);
    }

}


@Component({
    viewProviders: [HTTP_PROVIDERS],
    providers: [Http, AuthService]
})
export class RestService {
    protected base_url = api_url;
    private resource: string;

    constructor(public http:Http, public auth:AuthService) {
        this.http = http;
        this.auth = auth;
    };

    public authRequest(urlInput:string = '') {
        var headers = new Headers();
        this.auth.appendAuth(headers);
        headers.append('Accept', 'application/json');

        var url = this.base_url;
        if (!urlInput.match(/^\//)) {
            url += this.resource + '/' + urlInput;
        } else {
            url += urlInput.replace(/^\//, '');
        }
        return new RestRequest(url, headers, this);
    }

    public filter(data, keys: string[]) {
        var result = {};
        _.forEach(keys, (key) => { result[key] = data[key]; });
        return result;
    }
    protected useResource(resource: string) {
        this.resource = resource;
    }
}
