import {Record, Schema} from 'js-data';
import {Group} from './group';

export class AcknowledgmentInvitation extends Record {
    public id: number;
    
    public acknowledged: Group;
    public acknowledged_by: Group;
    public date: string;
    public issued_by_invitee: boolean;

    constructor(props?) {
        super(props);
    }
}

export const acknowledgmentInvitationSchema = new Schema({
	type: 'object',
    properties: {
        id: { type: 'integer' },
        date: { type: 'string' },
        issued_by_invitee: { type: 'boolean' }
    }
});

export const acknowledgmentInvitationRelations = {
    belongsTo: {
        group: [{
            localField: 'acknowledged',
            localKey: 'acknowledged_id'
        }, {
            localField: 'acknowledged_by',
            localKey: 'acknowledged_by_id'
        }]
    }
};


export const acknowledgmentInvitationMapper = {
    recordClass: AcknowledgmentInvitation,
    schema: acknowledgmentInvitationSchema,
    relations: acknowledgmentInvitationRelations,
    applySchema: true,
    debug: true
};