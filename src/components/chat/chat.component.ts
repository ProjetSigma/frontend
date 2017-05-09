import {Component, Input} from '@angular/core';
import {Router}   from '@angular/router';
import {APIService} from 'services/api.service';
import {Chat}   from 'resources/chat';
import {ChatMessage}   from 'resources/chat-message';
import {ChatMessageComponent} from './chat-message/chat-message.component';

@Component({
    selector: 'chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent {

    public message: string;
    @Input('chat') chat: Chat;

    constructor(public api: APIService) {

    }


    post() {
        this.api.store.action('chat-message', undefined, undefined, 'chat-message', {"user":this.api.me.id, "chat":11, "message":this.message});
    }
}
