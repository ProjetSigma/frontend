import {Injectable} from '@angular/core';
import {HttpAdapter} from 'js-data-http';

import {AuthService} from './auth.service';
import {WebSocketService} from './ws.service';
import {api_url} from '../config';

@Injectable()
export class APIAdapterService extends HttpAdapter {

    private basePath: string;

    constructor(public auth: AuthService, public ws: WebSocketService) {
        super({
            basePath: api_url,
            forceTrailingSlash: true,
            error: (a, b) => {},
            log: (a, b) => {},
            httpConfig: {headers: {
                'Content-Type': 'application/json'
            }}
        });
        this.basePath = api_url;
    }

    updateOptions(options) {
        if (!this.auth.isAuthenticated()) { return; }
        if (!options) { options = {}; }

        options.headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.auth.token()
        };
        return options;
    }

    wrap(cb: Function): Promise<any> {
        return this.auth.init().then(() => {
            const p: Promise<any> = cb();
            return p;
        });
    }

    find(resourceConfig: any, id: string|number, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'retrieve',
                    id: id
                });
            } else {
                options = this.updateOptions(options);
                return super.find(resourceConfig, id, options);
            }
        });
    }

    subFind(resourceConfig: any, id: string|number, name: string, params: any, options?: any) : Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: name,
                    id: id,
                    params: params
                });
            } else {
                options = this.updateOptions(options);
                const url = this.basePath + this.getEndpoint(resourceConfig, null, options) + '/' + id + '/' + name;
                console.log(url);
                return super.GET(url, options);
            }
        });
    }

    findAll(resourceConfig: any, params: any, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'list',
                    params: params
                });
            } else {
                options = this.updateOptions(options);
                return super.findAll(resourceConfig, params, options);
            }
        });
    }

    create(resourceConfig: any, attrs: any, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'create',
                    data: attrs
                });
            } else {
                options = this.updateOptions(options);
                return super.create(resourceConfig, attrs, options);
            }
        });
    }

    update(resourceConfig: any, id: string|number, attrs: any, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'update',
                    id: id
                });
            } else {
                options = this.updateOptions(options);
                return super.update(resourceConfig, id, attrs, options);
            }
        });
    }

    updateAll(resourceConfig: any, attrs: any, params: any, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'update',
                    data: attrs,
                    params: params
                });
            } else {
                options = this.updateOptions(options);
                return super.updateAll(resourceConfig, attrs, params, options);
            }
        });
    }

    destroy(resourceConfig: any, id: string|number, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'destroy',
                    id: id
                });
            } else {
                options = this.updateOptions(options);
                return super.destroy(resourceConfig, id, options);
            }
        });
    }

    destroyAll(resourceConfig: any, params?: any, options?: any): Promise<any> {
        return this.wrap(() => {
            if (this.ws.ready()) {
                return this.ws.sendREST({
                    location: this.getEndpoint(resourceConfig, null, options),
                    action: 'destroy',
                    params: params
                });
            } else {
                options = this.updateOptions(options);
                return super.destroyAll(resourceConfig, params, options);
            }
        });
    }
}
