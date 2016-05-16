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
    public default_member_rank: number;
    public req_rank_invite: number;
    public req_rank_kick: number;
    public req_rank_accept_join_requests: number;
    public req_rank_promote: number;
    public req_rank_demote: number;
    public req_rank_modify_group_infos: number;

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
        default_member_rank: { type: 'integer' },
        req_rank_invite: { type: 'integer' },
        req_rank_kick: { type: 'integer' },
        req_rank_accept_join_requests: { type: 'integer' },
        req_rank_promote: { type: 'integer' },
        req_rank_demote: { type: 'integer' },
        req_rank_modify_group_infos: { type: 'integer' },
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
