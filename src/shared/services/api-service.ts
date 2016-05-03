import {Component} from 'angular2/core';

import {utils as JSDataUtils, DataStore, Mapper, Record, Schema} from 'js-data';
import {HttpAdapter, addActions} from 'js-data-http';

import {AuthService} from './auth-service';

import {Cluster, clusterSchema, clusterRelations} from './cluster';
import {User, UserCluster, userSchema, userRelations} from './user';
import * as schemas from './schemas';
// import * as relations from './relations';

@Component({
    providers: [AuthService]
})
export class APIService {
    protected base_url: string = 'http://127.0.0.1:8000/';
    public DS: DataStore = new DataStore();
    private auth_: AuthService;

    // Resources
    public UserCluster: Mapper;
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
        this.DS.defineMapper('user_cluster', {
            // recordClass: UserCluster,
            relations: {
                belongsTo: {
                    user: {
                        foreignKey: 'user_id',
                        localField: 'user'
                    },
                    cluster: {
                        foreignKey: 'cluster_id',
                        localField: 'cluster'
                    }
                }
            },
            debug: true
        });
        this.Cluster = this.DS.defineMapper('cluster', {
            recordClass: Cluster,
            schema: clusterSchema,
            applySchema: true,
            relations: clusterRelations,
            debug: true
        });

        this.Group = this.DS.defineMapper('group', {
            schema: schemas.group,
            applySchema: false // for now: JSData Schema API not stable
        });

        this.User = this.DS.defineMapper('user', {
            recordClass: User,
            schema: userSchema,
            applySchema: true,
            relations: userRelations,
            debug: true
        });
        // addActions(userActions)(this.DS.getMapper('user'));

        this.Membership = this.DS.defineMapper('membership', {
            endpoint: 'group-member',
            schema: schemas.membership,
            applySchema: false // for now: JSData Schema API not stable
        });
    }
}
