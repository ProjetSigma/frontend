import {Injectable} from '@angular/core';
import {HttpAdapter} from 'js-data-http';

import {AuthService} from './auth.service';
import {WebSocketService} from './ws.service';
import {api_url} from '../config';

@Injectable()
export class APIAdapterService extends HttpAdapter {

    constructor(public auth: AuthService, public ws: WebSocketService) {
        super({
            basePath: api_url,
            forceTrailingSlash: true,
            error: (a,b)=>{},
            log: (a,b)=>{},
            httpConfig: {headers: {
                'Content-Type': 'application/json'
            }}
        })
    }

    addAuthHeader(options) {
        if(!this.auth.isAuthenticated()) return;
        if(!options) options = {};

        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.auth.token()
        };
        return options;
    }

    wrap(prom: Promise<any>) : Promise<any> {
        return this.auth.init().then(() => prom);
    }

    find(resourceConfig: any, id: string|number, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "retrieve",
                id: id
            }));
        } else {
            options = this.addAuthHeader(options)
            return this.wrap(super.find(resourceConfig, id, options));
        }
    }

    findAll(resourceConfig:any, params:any, options?:any) : Promise<any>{
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "list",
                params: params
            }));
        } else {
            options = this.addAuthHeader(options);
            return this.wrap(super.findAll(resourceConfig, params, options));
        }
    }

    create(resourceConfig:any, attrs:any, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "create",
                data: attrs
            }));
        } else {
            options = this.addAuthHeader(options)
            return this.wrap(super.create(resourceConfig, attrs, options));
        }
    }

    update(resourceConfig:any, id: string|number, attrs:any, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "update",
                id: id
            }));
        } else {
            options = this.addAuthHeader(options);
            return this.wrap(super.update(resourceConfig, id, attrs, options));
        }
    }

    updateAll(resourceConfig:any, attrs:any, params:any, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "update",
                data: attrs,
                params: params
            }));
        } else {
            options = this.addAuthHeader(options);
            return this.wrap(super.updateAll(resourceConfig, attrs, params, options));
        }
    }

    destroy(resourceConfig:any, id: string|number, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "destroy",
                id: id
            }));
        } else {
            options = this.addAuthHeader(options);
            return this.wrap(super.destroy(resourceConfig, id, options));
        }
    }

    destroyAll(resourceConfig:any, params?:any, options?:any) : Promise<any> {
        if(this.ws.ready()) {
            return this.wrap(this.ws.sendREST({
                location: this.getEndpoint(resourceConfig, null, options),
                action: "destroy",
                params: params
            }));
        } else {
            options = this.addAuthHeader(options);
            return this.wrap(super.destroyAll(resourceConfig, params, options));
        }
    }
}
