import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Chat} from '../../../shared/resources/chat';

@Component({
    selector: 'chat-inline-display',
    templateUrl: './chat/chat-details/chat-inline-display/chat-inline-display.html',
    directives: [NgIf, ROUTER_DIRECTIVES],
})
export class ChatInlineDisplayComponent {
    @Input('chat') chat: Chat;

}
