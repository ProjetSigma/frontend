import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {ChatsListComponent} from './chats-list/chats-list';
import {ChatDetailsComponent} from './chat-details/chat-details';

@Component({
    selector: 'chat',
    templateUrl: './chat/chat.html',
    encapsulation: ViewEncapsulation.Emulated,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
    {path: '/', component: ChatsListComponent, useAsDefault: true, as: 'List'},
    {path: '/:id', component: ChatDetailsComponent, as: 'Details'}
])
export class ChatsComponent {}
