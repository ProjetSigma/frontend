import {Record} from 'utils/record';

import {Membership} from './membership';

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

    public memberships:Membership[];
}

// export const userSchema = new Schema({
	// type: 'object',
    // properties: {
        // id: {type: 'integer'},
        // lastname: {type: 'string'},
        // firstname: {type: 'string'},
        // email: {type: 'string', format: 'email'},
        // phone: {type: 'string'},
		// photo: {},
        // is_active: {type: 'boolean'},
        // last_login: {type: 'string', format: 'date-time'},
        // last_modified: {type: 'string', format: 'date-time'},
        // join_date: {type: 'string', format: 'date-time'}
    // }
// });

// export const userRelations = {
    // hasMany: {
        // user_cluster: {
            // foreignKey: 'user_id',
            // localField: 'user_clusters'
        // },
        // membership: {
            // foreignKey: 'user_id',
            // localField: 'memberships'
        // }
    // }
// };


export const userRessource = {
    name: 'user',
    klass: User
};
