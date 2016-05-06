import {Component} from 'angular2/core';

import {DataStore} from 'js-data';
import {HttpAdapter} from 'js-data-http';

import {AuthService} from './auth-service';

import {Cluster, clusterSchema, clusterRelations} from '../resources/cluster';
import {User, userSchema, userRelations} from '../resources/user';
import {Group, groupSchema, groupRelations} from '../resources/group';
import {Membership,membershipSchema,membershipRelations} from '../resources/membership';
import * as schemas from './schemas';
// import * as relations from './relations';

@Component({
    providers: [AuthService]
})
export class APIService {
    protected base_url: string = 'http://127.0.0.1:8000/';
    public store: DataStore = new DataStore();
    private auth_: AuthService;

    constructor(public auth: AuthService) {
        this.auth_ = auth;

        // Configure headers
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + auth.accessToken
        };

        // Setup DataStore and HttpAdapter
        let httpAdapt = new HttpAdapter({ basePath: this.base_url, httpConfig: {headers: headers}, forceTrailingSlash: true });
        this.store.registerAdapter('http', httpAdapt, {default: true});

        // Register all Resources
        this.store.defineMapper('user_cluster', {
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
        this.store.defineMapper('cluster', {
            recordClass: Cluster,
            schema: clusterSchema,
            applySchema: true,
            relations: clusterRelations,
            debug: true
        });

        this.store.defineMapper('group', {
            recordClass: Group,
            schema: groupSchema,
            applySchema: true,
            relations: groupRelations,
            debug: true
        });

        this.store.defineMapper('user', {
            recordClass: User,
            schema: userSchema,
            applySchema: true,
            relations: userRelations,
            debug: true
        });
        // addActions(userActions)(this.DS.getMapper('user'));

        this.store.defineMapper('membership', {
            endpoint: 'group-member',
            recordClass: Membership,
            schema: membershipSchema,
            applySchema: true,
            relations: membershipRelations,
            debug:true
        });
    }
}
