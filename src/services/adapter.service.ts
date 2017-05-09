import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptionsArgs, RequestMethod, URLSearchParams, Response} from '@angular/http';

import {AuthService} from './auth.service';
import {WebSocketService} from './ws.service';
import {api_url} from '../config';

import {Adapter, RESTRequestParams, Method} from 'utils/adapter';

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
    
    rest(params: RESTRequestParams, method: Method): Promise<any> {
        return this.auth.init().then(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST(params);
            } else {
                let opt = this.getOptions();
                opt.url = this.buildUrl(params);
                switch(method) {
                    case Method.Post: opt.method = RequestMethod.Post; break;
                    case Method.Put: opt.method = RequestMethod.Put; break;
                    case Method.Delete: opt.method = RequestMethod.Delete; break;
                    case Method.Options: opt.method = RequestMethod.Options; break;
                    case Method.Head: opt.method = RequestMethod.Head; break;
                    case Method.Patch: opt.method = RequestMethod.Patch; break;
                    default:
                    case Method.Get: opt.method = RequestMethod.Get; break;
                };
                opt.body=params.data;
                
                return this.http.request(opt.url, opt).toPromise().then((res) => res.json());
            }
        });
    }
    
}
