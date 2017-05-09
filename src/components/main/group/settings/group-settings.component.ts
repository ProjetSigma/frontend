import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';

import {Group} from 'resources/group';
import {APIAdapterService} from 'services/adapter.service';
import {APIService} from 'services/api.service';

@Component({
    templateUrl: 'group-settings.component.html',
})
export class GroupSettingsComponent {
    public group: Group;

    constructor(public grPr: GroupProvider, protected api: APIService, protected adapter: APIAdapterService) {
        this.grPr.group.subscribe(
            (gr: Group) => { this.group = gr; }
        );
    }
}
