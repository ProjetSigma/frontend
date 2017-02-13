import {Injectable} from '@angular/core';
import {HttpAdapter} from 'js-data-http';

import {AuthService} from './auth.service';
import {api_url} from '../config';

@Injectable()
export class APIAdapterService extends HttpAdapter {

    constructor(public auth: AuthService) {
        super({
            basePath: api_url,
            forceTrailingSlash: true,
            httpConfig: {headers: {
                'Content-Type': 'application/json'
            }}
        })
    }
    
    addAuthHeader(options) {
        if(!this.auth.is_authenticated()) return;
        if(!options) options = {};
        
        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.auth.token()
        };
        return options;
    }
    
    find(resourceConfig: any, id: string|number, options?:any) : Promise<any> {
        options = this.addAuthHeader(options)
        return super.find(resourceConfig, id, options)
    }

}
