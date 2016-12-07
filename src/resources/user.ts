import {Record, Schema} from 'js-data';
import {IActionOpts} from 'js-data-http';

import {Cluster} from './cluster';
import {Membership} from './membership';

import * as _ from 'lodash';

export class User extends Record {
    public id: number;
    public photo;
    public clusters_id:number[];
    public email: string;
    public lastname: string;
    public firstname: string;
    public phone: string;
    public is_active: boolean;
    public last_modified: Date;
    public join_date: Date;
	public last_login: Date;

    // Relational fields
    public clusters: number[]; // clusters ids returned by REST API
    public user_clusters: UserCluster[]; // client-side only relational objects 'user_cluster'
    public memberships:Membership[];

    constructor (props?) {
        super(props);
    }

    // Returns the clusters list as JSData Records list
    public getClusters(): Cluster[] {
        return _.reduce(this.user_clusters, c => c['cluster'], []);
    }
}

export class UserCluster extends Record {
    public user_id: number;
    public cluster_id: number;
    public user: User;
    public cluster: Cluster;

    constructor(props) {
        super(props);
    }
}

export const userSchema = new Schema({
	type: 'object',
    properties: {
        id: {type: 'integer'},
        clusters_id : {type : 'array', items: {type: 'integer'}},
        lastname: {type: 'string'},
        firstname: {type: 'string'},
        email: {type: 'string', format: 'email'},
        phone: {type: 'string'},
		photo: {},
        is_active: {type: 'boolean'},
        last_login: {type: 'string', format: 'date-time'},
        last_modified: {type: 'string', format: 'date-time'},
        join_date: {type: 'string', format: 'date-time'}
    }
});

export const userRelations = {
    hasMany: {
        user_cluster: {
            foreignKey: 'user_id',
            localField: 'user_clusters'
        },
        membership: {
            foreignKey: 'user_id',
            localField: 'memberships'
        }
    }
};

export const userActions : { [key: string]: IActionOpts; } = {
    'me': {
        adapter: 'http',
        pathname: 'me',
        response: (u) => { return new User(u.data); }
    }
};
