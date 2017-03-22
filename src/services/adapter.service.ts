import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, RequestMethod, URLSearchParams, Response} from '@angular/http';

import {AuthService} from './auth.service';
import {WebSocketService} from './ws.service';
import {api_url} from '../config';

import {Adapter, RESTRequestParams} from 'utils/adapter';

@Injectable()
export class APIAdapterService implements Adapter {

    private basePath: string;

    constructor(public http: Http, public auth: AuthService, public ws: WebSocketService) {
        
    }
    
    getOptions(): RequestOptionsArgs {
        if (!this.auth.isAuthenticated()) { return {}; }
        return {
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + this.auth.token()
            })
        };
    }
    
    buildUrl(params: RESTRequestParams): string {
        let url: string = api_url;
        url += params.location + '/';
        if(params.id !== undefined) {
            url += params.id + '/';
        } if(["list", "retrieve", "create", "update", "destroy"].indexOf(params.action) == -1) {
            url += params.action + '/';
        }
        return url;
    }
    
    rest(params: RESTRequestParams, getMethod: boolean = true): Promise<any> {
        if (this.ws.ready()) {
            return this.ws.sendREST(params);
        } else {
            let opt = this.getOptions();
                opt.url = this.buildUrl(params);
                opt.method = (getMethod ? RequestMethod.Get : RequestMethod.Post);
                
            return this.http.request(opt.url, opt).toPromise().then((res) => res.json());
        }
    }
    
}
