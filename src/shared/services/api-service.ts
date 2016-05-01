import {Component} from 'angular2/core';

import {utils as JSDataUtils, DataStore, Mapper} from 'js-data';
import {HttpAdapter} from 'js-data-http';
import {Observable} from 'rxjs/Rx';

import {AuthService} from './auth-service';
import * as schemas from './schemas';
// import * as relations from './relations';

@Component({
    providers: [AuthService, JSDataUtils, DataStore, Mapper, Observable]
})
export class APIService {
    protected base_url: string = 'http://127.0.0.1:8000/';
    public DS: DataStore = new DataStore();
    private auth_: AuthService;

    // Resources
    public Cluster: Mapper;
    public Group: Mapper;
    public User: Mapper;
    public Membership: Mapper;

    constructor(public auth: AuthService) {
        this.auth_ = auth;

        // Configure headers
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.accessToken
        };

        // Setup DataStore and HttpAdapter
        let httpAdapt = new HttpAdapter({ basePath: this.base_url, httpConfig: {headers: headers}, forceTrailingSlash: true });
        this.DS.registerAdapter('http', httpAdapt, {default: true});

        // Register all Resources
        this.Cluster = this.DS.defineMapper('cluster', {
            schema: schemas.cluster,
            applySchema: false // for now: JSData Schema API not stable
        });
        this.Group = this.DS.defineMapper('group', {
            schema: schemas.group,
            applySchema: false // for now: JSData Schema API not stable
        });
        this.User = this.DS.defineMapper('user', {
            schema: schemas.user,
            applySchema: false // for now: JSData Schema API not stable
        });
        this.Membership = this.DS.defineMapper('membership', {
            endpoint: 'group-member',
            schema: schemas.membership,
            applySchema: false // for now: JSData Schema API not stable
        });
    }
}
