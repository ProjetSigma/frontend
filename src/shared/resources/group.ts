import {Record, Schema} from 'js-data';

export class Group extends Record {
    public id:number;
    public memberships:number[];//array of id of Memberships
    public name:string;
    private visibility:string;//public or privaye
    public default_member_rank:number;
    public req_rank_invite:number;
    public req_rank_kick:number;
    public req_rank_accept_join_requests:number;
    public req_rank_promote:number;
    public req_rank_demote:number;
    public req_rank_modify_group_infos:number;

    //Relational field
    public resp_group:number;
    public group_resp_group:Group;


    constructor (props?) {
        super(props);
    }
}

export const groupSchema = new Schema({
    properties: {
        id: {type: 'integer'},
        memberships: {type: 'array', items: {type: 'integer'}},
        name: {type: 'string'},
        visibility: {type: 'string'},
        default_member_rank: {type: 'integer'},
        req_rank_invite: {type: 'integer'},
        req_rank_kick: {type: 'integer'},
        req_rank_accept_join_requests: {type: 'integer'},
        req_rank_promote: {type : 'integer'},
        req_rank_demote: {type : 'integer'},
        req_rank_modify_group_infos: {type: 'integer'},
    }
});

export const groupRelations = {
    hasOne: {
        group : {
            foreignKey: 'resp_group',
            localField: 'group_resp_group'
        }
    }
}
