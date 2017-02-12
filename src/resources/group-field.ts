import {Record, Schema, Mapper} from 'js-data';
import {Group} from './group';

export enum GroupFieldType {
    Number = 0,
    String = 1,
    Choice = 2,
    Email = 3
}

export class GroupField extends Record {
    
    public id: number;
    public group: Group;
    
    public name: string;
    public type: GroupFieldType;
    public accept: string;
    
    public is_protected: boolean;
    public multiple_values_allowed: boolean;
    
    constructor(props?) {
        super(props);
    }
}

export const groupFieldSchema = new Schema({
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

export const groupFieldMapper = {
    recordClass: GroupField,
    schema: groupFieldSchema,
    applySchema: true,
    debug: true
};