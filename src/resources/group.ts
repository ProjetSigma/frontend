import {Record} from 'utils/record';
import {Collection} from 'utils/collection';

import {GroupMember} from './group-member';
import {GroupPublication} from './group-publication';
import {Acknowledgment} from './acknowledgment';
import {User} from './user';

export class Group extends Record {
    public pk: number;
    public name: string;
    public desription: string;

    public is_protected: boolean;

    public can_anyone_ask: boolean;
    public need_validation_to_join: boolean;

    public members_visibility: number;
    public group_visibility: number;


    public acknowledging: Acknowledgment[];
    public acknowledged_by: Acknowledgment[];
    public memberships: Collection<GroupMember>;

    public publications: Collection<GroupPublication>;
}

// export const groupSchema = new Schema({
    // type: 'object',
    // properties: {
        // id: { type: 'integer' },
        // name: { type: 'string' },
        // description: { type: 'string' },

        // is_protected: { type: 'boolean' },
        // can_anyone_ask: { type: 'boolean' },
        // need_validation_to_join: { type: 'boolean' },

        // members_visibility: { type: 'integer' },
        // group_visibility: { type: 'integer' }
    // }
// });

// export const groupRelations = {
    // hasMany: {
        // acknowledgment: [{
            // foreignKey: 'acknowledged_by_id',
            // localField: 'acknowledging'
        // }, {
            // foreignKey: 'acknowledged_id',
            // localField: 'acknowledged'
        // }],
        // membership: {
            // foreignKey: 'group_id',
            // localField: 'memberships'
        // }
    // }
// };


export const groupRessource = {
    name: 'group',
    klass: Group,
    subCollections: [{
        action: 'members',
        field: 'memberships',
        ressource: 'group-member'
    }, {action: 'publications', field:'publications', ressource:'group-publication'}]
};
