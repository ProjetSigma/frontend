import {Record, Schema} from 'js-data';
import {GroupField} from './group-field';
import {Membership} from './membership';

export class GroupFieldValue extends Record {
    
    public id: number;
    
    public membership: Membership;
    public field: GroupField;
    public value: string;
    
    constructor(props?) {
        super(props);
    }
}

export const groupFieldValueSchema = new Schema({
	type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        type: { type: 'integer' },
        accept: { type: 'integer' },
        
        is_protected: { type: 'boolean' },
        multiple_values_allowed: { type: 'boolean' }
    }
});

export const groupFieldValueMapper = {
    recordClass: GroupFieldValue,
    schema: groupFieldValueSchema,
    applySchema: true,
    debug: true
};