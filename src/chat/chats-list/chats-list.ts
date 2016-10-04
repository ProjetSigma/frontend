import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {ChatInlineDisplayComponent} from '../chat-details/chat-inline-display/chat-inline-display';
import {Chat} from '../../shared/resources/chat';

@Component({
    selector: 'chats-list',
    templateUrl: './chat/chats-list/chats-list.html',
    directives: [NgFor, ROUTER_DIRECTIVES, ChatInlineDisplayComponent]
})
export class ChatsListComponent {
    private allChats: Chat[] = [];
    private displayedChats: Chat[] = [];

    constructor(public api: APIService, public router: Router) {
        this.allChats = [];
        this.displayedChats = [];
        this.getChats();
    };

    getChats() {
        this.api.store.findAll('chat').then(res => {
            this.allChats = res;
            this.displayedChats = res;
        });
    }
}
