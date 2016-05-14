import {Component} from 'angular2/core';

import {DataStore} from 'js-data';
import {HttpAdapter, addActions} from 'js-data-http';

import {AuthService} from './auth-service';
import {api_url} from '../../config';

import {Cluster, clusterSchema, clusterRelations} from '../resources/cluster';
import {User, userSchema, userRelations, userActions} from '../resources/user';
import {Group, groupSchema, groupRelations} from '../resources/group';
import {Membership, membershipSchema, membershipRelations} from '../resources/membership';

@Component({
})
export class APIService {
    protected base_url: string = api_url;
    public store: DataStore = new DataStore();
    public me: User = new User();

    constructor(private auth: AuthService) { }

    buildStore() {
        // Configure headers
        let headers = {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.auth.accessToken
        };
        // Setup DataStore and HttpAdapter
        let httpAdapt = new HttpAdapter({ basePath: this.base_url, httpConfig: { headers: headers }, forceTrailingSlash: true });
        this.store.registerAdapter('http', httpAdapt, { default: true });
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
            debug: true,
        });

        this.store.defineMapper('membership', {
            endpoint: 'group-member',
            recordClass: Membership,
            schema: membershipSchema,
            applySchema: true,
            relations: membershipRelations,
            debug: true
        });
    }

    login(username, password) {
        var authRequest =  this.auth.authentificate(username, password);
        authRequest.subscribe(res => {
            this.buildStore();
            (addActions(userActions)(this.store.getMapper('user'))).me()
            .then(res =>  this.me = res);
        }, error => '');
        return authRequest;
    };

    logout() {
        this.auth.logout();
        location.reload();
    };

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }
}
