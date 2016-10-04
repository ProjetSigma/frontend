import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {api_url} from '../../config';

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
    private searchChat: string = '';
    private newChat: string = '';
    private search: boolean;
    private add: boolean;

    constructor(public api: APIService, public router: Router) {
        this.allChats = [];
        this.displayedChats = [];
        this.getChats();
        this.search = false;
        this.add = false;
    };

    getChats() {
        this.api.store.findAll('chat').then(res => {
            this.allChats = res;
            this.displayedChats = res;
        });
    }

    updateChats(searchBar) {
        this.displayedChats = this.allChats;

        var q = searchBar.target.value;
        if (q.trim() === '') {
            return;
        }
        q = q.toLowerCase();

        this.displayedChats = this.allChats.filter((chat) => {
            if (chat.name.toLowerCase().indexOf(q) > -1) {
                return true;
            }
            return false;
        });
    }

    seeSearch(){
        this.search = ! this.search;
    }

    addChat(){
        if (this.add && this.newChat !== ''){
            this.api.store.getAdapter('http').POST(
                api_url+'chat/',
                 {'name': this.newChat}
                ).then(
                (res) => {
                    console.log(res);
                    console.log('Chat créé.');
                    this.newChat = '';
                    this.router.navigateByUrl('/chat/'+res.data.id);
            });
        } else {
            this.add = !this.add;
        }
    }
}
