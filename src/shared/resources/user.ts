import {Record, Schema} from 'js-data';

import {Cluster} from './cluster';

export class User extends Record {
    public id: number;
    public last_login: Date;
    public photo;
    public email: string;
    public lastname: string;
    public firstname: string;
    public phone: string;
    public is_active: boolean;
    public last_modified: Date;
    public join_date: Date;

    // Relational fields
    public groups: any[]; // TODO: type Group[]
    public clusters: number[]; // clusters ids returned by REST API
    public user_clusters: UserCluster[]; // client-side only relational objects 'user_cluster'

    constructor (props?) {
        super(props);
        this.last_login = new Date();
        this.last_modified = new Date();
        this.join_date = new Date();
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
    properties: {
        id: {type: 'integer'},
        lastname: {type: 'string'},
        firstname: {type: 'string'},
        email: {type: 'string', format: 'email'},
        phone: {type: 'string'},
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
        }
    }
};

export const userActions = {
    'me': {
        adapter: 'http',
        pathname: 'me',
        response: (u) => { return new User(u.data); }
    }
};
