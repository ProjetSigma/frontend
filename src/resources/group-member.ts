import {Record} from 'utils/record';
import {User} from './user';
import {Group} from './group';

export class GroupMember extends Record {
    public id: number;
    public user_id:number;
    public group_id:number;
    public created:Date;
    public join_date:Date;
    public leave_date:Date;
    public is_administrator:boolean;
    public is_super_administrator:boolean;
    public can_invite:boolean;
    public can_be_contacted:boolean;
    public can_publish:boolean;
    public can_kick:boolean;
    public can_modify_group_infos:boolean;
    public is_accepted:boolean;
}

// export const membershipSchema = new Schema({
	// type: 'object',
    // properties: {
        // id: { type: 'integer' },
        // user: {type: 'string'},
        // group: {type: 'string'},
        // created: {type: 'string', format: 'date-time'},
        // join_date: {type: 'string', format: 'date-time'},
		// is_administrator: {type: 'boolean'},
        // is_super_administrator: {type: 'boolean'},
        // can_invite: {type: 'boolean'},
        // can_kick: {type: 'boolean'},
        // can_be_contacted: {type: 'boolean'},
        // can_publish: {type: 'boolean'},
        // can_modify_group_infos: {type: 'boolean'},
        // is_accepted: {type: 'boolean'}
    // }
// });

// export const membershipRelations = {
    // belongsTo: {
        // group: {
            // localKey: 'group_id',
            // localField : 'group'
        // },
        // user: {
            // localKey: 'user_id',
            // localField: 'user'
        // }
    // }
// };


export const groupMemberRessource = {
    name: 'group-member',
    klass: GroupMember
};