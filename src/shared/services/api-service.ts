import {Component} from 'angular2/core';

import {DataStore} from 'js-data';
import {HttpAdapter, addActions} from 'js-data-http';

import {AuthService} from './auth-service';
import {api_url} from '../../config';

import {Cluster, clusterSchema, clusterRelations} from '../resources/cluster';
import {User, userSchema, userRelations, userActions} from '../resources/user';
import {Group, groupSchema, groupRelations} from '../resources/group';
import {Membership, membershipSchema, membershipRelations} from '../resources/membership';
import {ChatMember, chatmemberSchema, chatmemberRelations} from '../resources/chat-member';
import {Chat, chatSchema, chatRelations} from '../resources/chat';
import {Message, messageSchema, messageRelations} from '../resources/message';

@Component({
})
export class APIService {
    protected base_url: string = api_url;
    public store: DataStore = new DataStore();
    public me: User = new User();

    constructor(private auth: AuthService) {
        if (this.auth.checkIfPreviouslyAuthentificated()) {
            this.initializeStore();
        }
    }

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

        this.store.defineMapper('chatmember', {
            recordClass: ChatMember,
            schema: chatmemberSchema,
            applySchema: true,
            relations: chatmemberRelations,
            debug: true
        });

        this.store.defineMapper('chat', {
            recordClass: Chat,
            schema: chatSchema,
            applySchema: true,
            relations: chatRelations,
            debug: true
        });

        this.store.defineMapper('message', {
            recordClass: Message,
            schema: messageSchema,
            applySchema: true,
            relations: messageRelations,
            debug: true
        });
    }

    //Auth-related methods
    login(username, password) {
        var authRequest =  this.auth.authentificate(username, password);
        authRequest.subscribe(res => {
            this.initializeStore();
        }, error => '');
        return authRequest;
    };

    initializeStore() {
        this.buildStore();
        (addActions(userActions)(this.store.getMapper('user'))).me()
        .then(res =>  {
            this.me = res;
            this.getMyGroups();
        });
    }

    logout() {
        this.auth.logout();
    };

    isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    //Me-related methods

    //Retrieves all the groups of the logged user and attach them to the User
    //object.
    getMyGroups() {
        this.store.findAll('membership',{'user':this.me.id}).then(res => {
            this.me.memberships = res;
            for (var membership of this.me.memberships) {
                this.store.find('group',membership.group_id).then(res => {
                    membership.group = res;
                });
            };
        });
    }

    getMyMembership(group_id:number) {
        if(this.me.memberships) {
            for (var membership of this.me.memberships) {
                if (membership.group_id === group_id)
                    return membership;
            }
            return undefined;
        } else {
            return undefined;
        }
    }

    //Returns true if the user is member of the argument group.
    isInMyGroups(group_id:number) {
        if (this.me.memberships) {
            for (var membership of this.me.memberships) {
                if (membership.group_id === group_id)
                    return true;
            }
            return false;
        } else {
            return false;
        }
    }
}
