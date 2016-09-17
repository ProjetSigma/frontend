import {Record, Schema} from 'js-data';
import {Membership} from './membership';

export class Group extends Record {
    //Fields fetched from the backend
    public id: number;
    public members_count: number;
    public name: string;
    public is_private:boolean;//public or private
    public description: string;
    public is_protected:boolean;
    public can_anyone_join:boolean;
    public need_validation_to_join:boolean;

    //Relational fields added by JS-Data
    public resp_group: Group;
    public memberships: Membership[];


    constructor(props?) {
        super(props);
    }
}

export const groupSchema = new Schema({
    properties: {
        id: { type: 'integer' },
        members_count: {type: 'integer'},
        name: { type: 'string' },
        is_private: { type: 'boolean' },
        description: {type: 'string'},
        is_protected: {type: 'boolean'},
        can_anyone_join: {type : 'boolean'},
        need_validation_to_join: {type : 'boolean'}
    }
});

export const groupRelations = {
    hasMany: {
        membership: {
            foreignKey: 'group_id',
            localField: 'memberships'
        }
    }
};
