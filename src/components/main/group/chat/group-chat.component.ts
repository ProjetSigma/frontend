import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';

import {Group} from 'resources/group';
import {APIAdapterService} from 'services/adapter.service';
import {APIService} from 'services/api.service';

@Component({
    templateUrl: 'group-chat.component.html',
})
export class GroupChatComponent {
    public group: Group;

    constructor(public grPr: GroupProvider, protected api: APIService, protected adapter: APIAdapterService) {
        this.grPr.group.subscribe(
            (gr: Group) => { this.group = gr; }
        );
    }
}
