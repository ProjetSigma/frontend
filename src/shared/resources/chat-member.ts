import {Record, Schema} from 'js-data';
import {IActionOpts} from 'js-data-http';
import {User} from './user';
import {Chat} from './chat';
import {Message} from './message';

export class ChatMember extends Record {
    //Fields fetched in the backend
    public id: number;
    public is_creator:boolean;
    public is_admin:boolean;
    public is_member:boolean;
    public is_banned: boolean;
    public user_id:number;
    public chat_id:number;

    //Fields linked by JS-Data
    public user:User;
    public chat:Chat;
    public messages:Message[];

    constructor(props?) {
        super(props);
    }
}

export const chatmemberSchema = new Schema({
    properties: {
        id: { type: 'integer' },
        is_creator: {type: 'boolean'},
        is_admin: {type: 'boolean'},
        is_member: {type: 'boolean'},
        is_banned: {type: 'boolean'},
        user: {type: 'string'},
        chat: {type: 'string'},
    }
});

export const chatmemberRelations = {
    belongsTo: {
        chat: {
            localKey: 'chat_id',
            localField : 'chat'
        },
        user: {
            localKey: 'user_id',
            localField: 'user'
        }
    },
    hasMany: {
        message: {
            foreignKey: 'chatmember_id',
            localField: 'messages'
        }
    }
};

/*export const membershipActions : { [key: string]: IActionOpts; } = {
    'acceptJoinRequest' : {
        adapter: 'http',
        pathname: 'accept_join_request',
        response: (u) => { return new ChatMember(u.data); }
    }
};*/
