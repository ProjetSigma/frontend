import {Component, Input} from '@angular/core';

import {ChatMessage} from 'resources/chat-message';
import {APIService} from 'services/api.service';

@Component({
    selector: 'chat-message',
    templateUrl: 'chat-message.component.html'
})
export class ChatMessageComponent {
    @Input('chat-message') chatMessage: ChatMessage;

    constructor(public api: APIService) {

    }
}
