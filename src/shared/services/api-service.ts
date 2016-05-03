import {Component} from 'angular2/core';

import {utils as JSDataUtils, DataStore, Mapper, Record} from 'js-data';
import {HttpAdapter, addActions} from 'js-data-http';

import {AuthService} from './auth-service';

import {User, userActions} from './user';
import * as schemas from './schemas';
// import * as relations from './relations';

@Component({
    providers: [AuthService, JSDataUtils, DataStore, Mapper, addActions, User]
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
            recordClass: User,
            schema: schemas.user,
            applySchema: true // for now: JSData Schema API not stable
        });
        // addActions(userActions)(this.DS.getMapper('user'));

        this.Membership = this.DS.defineMapper('membership', {
            endpoint: 'group-member',
            schema: schemas.membership,
            applySchema: false // for now: JSData Schema API not stable
        });
    }
}
