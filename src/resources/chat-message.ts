import {Record} from 'utils/record';
import {Group} from './group';
import {User} from './user';

export class ChatMessage extends Record {
    public id: number;
    public created_date: string;
    public user: User;
}


export const chatMessageRessource = {
    name: 'chat-message',
    klass: ChatMessage,
};
