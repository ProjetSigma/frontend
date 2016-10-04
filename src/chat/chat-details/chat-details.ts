import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Record} from 'js-data';
import {APIService} from '../../shared/services/api-service';
import {ChatDisplayComponent} from './chat-display/chat-display';

@Component({
    selector: 'chat-details',
    templateUrl: './chat/chat-details/chat-details.html',
    directives: [ChatDisplayComponent]
})
export class ChatDetailsComponent {
    public chat = new Record();

    constructor(public api: APIService, params: RouteParams) {
        this.getChat(params.get('id'));
    };

    getChat(id) {
        this.api.store.find('chat', id).then(res => this.chat = res);
    }
}
