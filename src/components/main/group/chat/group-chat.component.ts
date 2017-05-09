import {Component} from '@angular/core';
import {APIService} from 'services/api.service';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {Chat} from 'resources/chat';

@Component({
    templateUrl: 'group-chat.component.html',
})
export class GroupChatComponent{
    public group: Group;
    public chat: Chat;
    public loaded = false;

    constructor(public grPr: GroupProvider, public api: APIService) {
        this.grPr.group.subscribe(
            (gr: Group) => {
                this.group = gr;
                /*this.api.store.find("chat", 18).then((response)=>{
                  this.group.chat = response;
                  this.loaded = true;
                });*/
                this.group.chat = new Chat(18, "");
                this.api.store.find("chat", 18, "list_messages").then((response)=>{
                  this.group.chat.messages = response;
                  this.loaded = true;
                });
            }
        );
    }
}
