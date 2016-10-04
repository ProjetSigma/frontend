import {Record, Schema} from 'js-data';
import {ChatMember} from './chat-member';
import {Chat} from './chat';

export class Message extends Record {
    //Fields fetched from the backend
    public id: number;
    public text: string;
    public chatmember_id: number;
    public chat_id: number;
    public date: Date;
    public attachment;

    //Relational fields added by JS-Data
    public chatmember: ChatMember;
    public chat: Chat;

    constructor(props?) {
        super(props);
    }
}

export const messageSchema = new Schema({
    properties: {
        id: { type: 'integer' },
        text: { type: 'string' },
        chatmember: { type: 'string' },
        chat: {type: 'string'},
        date: {type: 'string'},
        //attachment: {type: 'string'},
    }
});

export const messageRelations = {
    belongsTo: {
        chatmember: {
            localKey: 'chatmember_id',
            localField: 'chatmember'
        },
        chat: {
            localKey: 'chat_id',
            localField: 'chat'
        }
    }
};
