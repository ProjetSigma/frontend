import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitchDefault} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {api_url} from '../../../config';

import {APIService} from '../../../shared/services/api-service';
import {Chat} from '../../../shared/resources/chat';
import {ChatMember} from '../../../shared/resources/chat-member';
import {Message} from '../../../shared/resources/message';
import {User} from '../../../shared/resources/user';

@Component({
    selector: 'chat-display',
    templateUrl: './chat/chat-details/chat-display/chat-display.html',
    directives: [NgFor, NgIf, NgSwitchDefault, ROUTER_DIRECTIVES],
})
export class ChatDisplayComponent {
    @Input('chat') chat: Chat;
    private newMessage: string;
    private myChatMember: ChatMember;
    private add: boolean;
    private messages: boolean;
    private users: User[];
    private newMember: User;


    constructor(public api: APIService) {
        this.newMessage = '';
        this.myChatMember = new ChatMember;
        this.add = false;
        this.messages = true;
        this.api.store.findAll('user').then(res => {
            this.users = res;
        });
        this.newMember = new User();
    };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the chat to display.
    ngOnChanges() {
        if (this.chat !== undefined) {
            this.getMessages();
            this.getMembers();
        }
    }

    getMembers() {
        this.api.store.findAll('chatmember', { 'chat': this.chat.id }).then(res => {
            for (var chatmember of res) {
                this.api.store.find('user', chatmember.user_id);
                if (chatmember.user_id === this.api.me.id) {
                    this.getMyChatMember(chatmember);
                };
            };
            this.chat.members = res;
        });
    }

    getMessages() {
        this.api.store.findAll('message', { 'chat': this.chat.id }).then(res => {
            for (var message of res) {
                this.api.store.find('chatmember', message.chatmember_id);
                message.date = new Date(message.date);
            };
            this.chat.messages = res;
        });
    }

    realMembers() {
        if (this.chat.members) {
            return this.chat.members.filter(function(member) {
                return member.is_member === true;
            });
        } else {
            return [];
        }
    }

    getMyChatMember(chatmember: ChatMember){
        this.myChatMember = chatmember;
    }

    sendMessage(){
        var messageToSend:Message= new Message;
        messageToSend.text = this.newMessage;
        this.api.store.getAdapter('http').POST(
            api_url+'chatmember/'+this.myChatMember.id+'/send_message',
             messageToSend
            ).then(
            (res) => {
                console.log(res.data);
                this.api.store.find('message', res.data.id).then(
                    (message) => {
                        message.date = new Date(message.date);
                        //this.chat.messages.push(message);
                    }
                )
                this.newMessage = '';
        });
    }

    addMember(){
        console.log(this.newMember);
        this.api.store.getAdapter('http').POST(
            api_url+'chat/'+this.myChatMember.chat_id+'/add_member',
             {'user_id':this.newMember}
            ).then(
            (res) => {
                console.log(res);
                console.log('Membre ajouté');
        });
    }

    seeMessages(){
        this.messages = !this.messages;
    }

    seeAddMember(){
        this.add = !this.add;
    }
}
