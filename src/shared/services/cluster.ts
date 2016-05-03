import {Record, Schema} from 'js-data';

export class Cluster extends Record {
    public id: number;
    public name: string;
    public description: string;
    public design: string;

    // Relational fields
    public cluster_users: any[] = [];

    constructor (props) {
        super(props);
    }
}

export const clusterSchema = new Schema({
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        description: {type: 'string'},
        design: {type: 'string'}
    }
});

export const clusterRelations = {
    hasMany: {
        user_cluster: {
            foreignKey: 'cluster_id',
            localField: 'cluster_users'
        }
    }
};
