import {Record, Schema} from 'js-data';
import {Membership} from './membership';
import {Acknowledgment} from './acknowledgment';

export class Group extends Record {
    public id: number;
    public name: string;
    public desription: string;
    
    public is_protected: boolean;
    
    public can_anyone_ask: boolean;
    public need_validation_to_join: boolean;
    
    public members_visibility: number;
    public group_visibility: number;

    
    public acknowledging: Acknowledgment[];
    public acknowledged_by: Acknowledgment[];
    public memberships: Membership[];

    constructor(props?) {
        super(props);
    }
}

export const groupSchema = new Schema({
	type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        description: { type: 'string' },
        
        is_protected: { type: 'boolean' },
        can_anyone_ask: { type: 'boolean' },
        need_validation_to_join: { type: 'boolean' },
    
        members_visibility: { type: 'integer' },
        group_visibility: { type: 'integer' }
    }
});

export const groupRelations = {
    hasMany: {
        acknowledgment: [{
            foreignKey: 'acknowledged_by_id',
            localField: 'acknowledging'
        }, {
            foreignKey: 'acknowledged_id',
            localField: 'acknowledged'
        }]
        membership: {
            foreignKey: 'group_id',
            localField: 'memberships'
        }
    }
};


export const groupMapper = {
    recordClass: Group,
    schema: groupSchema,
    relations: groupRelations,
    applySchema: true,
    debug: true
};