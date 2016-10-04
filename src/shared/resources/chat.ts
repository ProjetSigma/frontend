import {Record, Schema} from 'js-data';
import {Message} from './message';
import {ChatMember} from './chat-member'

export class Chat extends Record {
    //Fields fetched from the backend
    public id: number;
    public name: string;

    //Relational fields added by JS-Data
    public messages : Message[];
    public members : ChatMember[];


    constructor(props?) {
        super(props);
    }
}

export const chatSchema = new Schema({
    properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
    }
});

export const chatRelations = {
    hasMany: {
        chatmember: {
            foreignKey: 'chat_id',
            localField: 'members',
        },
        message: {
            foreignKey: 'chat_id',
            localField: 'messages',
        }
    }
};
