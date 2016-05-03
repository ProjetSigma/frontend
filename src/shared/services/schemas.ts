import {Schema} from 'js-data';

export const group = new Schema({
    properties: {
        id: {type: 'integer'},
        name: {type: 'string'},
        private: {type: 'boolean'},
        description: {type: 'string'},
        protected: {type: 'boolean'},
        default_member_rank: {type: 'integer'},
        req_rank_invite: {type: 'integer'},
        req_rank_kick: {type: 'integer'},
        req_rank_accept_join_requests: {type: 'integer'},
        req_rank_promote: {type: 'integer'},
        req_rank_demote: {type: 'integer'},
        req_rank_modify_group_infos: {type: 'integer'}
    }
});


export const membership = new Schema({
    properties: {
        id: {type: 'integer'},
        created: {type: 'string', format: 'date-time'},
        join_date: {type: 'string', format: 'date-time'},
        leave_date: {type: 'string', format: 'date-time'},
        perm_rank: {type: 'integer'}
    }
});
