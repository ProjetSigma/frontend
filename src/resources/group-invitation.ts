import {Record, Schema} from 'js-data';
import {Group} from './group';
import {User} from './user';

export class GroupInvitation extends Record {
    public id: number;
    
    public group: Group;
    public invitee: User;
    public date: string;
    public issued_by_invitee: boolean;

    constructor(props?) {
        super(props);
    }
}

export const groupInvitationSchema = new Schema({
	type: 'object',
    properties: {
        id: { type: 'integer' },
        date: { type: 'string', format: 'date-time' },
        issued_by_invitee: { type: 'boolean' }
    }
});

export const groupInvitationRelations = {
    belongsTo: {
        group: {
            localField: 'group',
            localKey: 'group_id'
        },
        user: {
            localField: 'invitee',
            localKey: 'invitee_id'
        }
    }
};


export const groupInvitationMapper = {
    recordClass: GroupInvitation,
    schema: groupInvitationSchema,
    relations: groupInvitationRelations,
    applySchema: true,
    debug: true
};