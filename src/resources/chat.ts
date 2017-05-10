import {Record} from 'utils/record';
import {Collection} from 'utils/collection';

import {ChatMessage} from './chat-message';

export class Chat extends Record {
    public id: number;
    public created_date: string;
    public messages: Collection<ChatMessage>;
}
export const chatRessource = {
    name: 'chat',
    klass: Chat,
    subCollections: [
  {
    action: 'list_messages',
    ressource: 'chat-message'
  }]
};
