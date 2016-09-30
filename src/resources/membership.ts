import {Record, Schema} from 'js-data';
import {IActionOpts} from 'js-data-http';
import {User} from './user';
import {Group} from './group';

export class Membership extends Record {
    //Fields fetched in the backend
    public id: number;
    public user_id:number;
    public group_id:number;
    public created:Date;
    public join_date:Date;
    public leave_date:Date;
    public perm_rank:number;

    //Fields linked by JS-Data
    public user:User;
    public group:Group;

    constructor(props?) {
        super(props);
        this.created = new Date();
        this.leave_date = new Date();
        this.join_date = new Date();
    }
}

export const membershipSchema = new Schema({
    properties: {
        id: { type: 'integer' },
        user: {type: 'string'},
        group: {type: 'string'},
        created: {type: 'string', format: 'date-time'},
        join_date: {type: 'string', format: 'date-time'},
        leave_date: {type: 'string', format: 'date-time'},
        perm_rank: {type : 'integer'}
    }
});

export const membershipRelations = {
    belongsTo: {
        group: {
            localKey: 'group_id',
            localField : 'group'
        },
        user: {
            localKey: 'user_id',
            localField: 'user'
        }
    }
};

export const membershipActions : { [key: string]: IActionOpts; } = {
    'acceptJoinRequest' : {
        adapter: 'http',
        pathname: 'accept_join_request',
        response: (u) => { return new Membership(u.data); }
    }
};
