import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';

import {Group} from 'resources/group';
import {APIAdapterService} from 'services/adapter.service';
import {Membership} from 'resources/membership';
import {UserInlineDisplayComponent} from 'components/users/user-details/user-inline-display/user-inline-display.component';
import {APIService} from 'services/api.service';

@Component({
    templateUrl: 'group-members.component.html',
})
export class GroupMembersComponent {
    public group: Group;
    public users;
    public members: Membership[];
    public showAdvancedSearch = false;

    constructor(public grPr: GroupProvider, protected api: APIService, protected adapter: APIAdapterService) {
        this.grPr.group.subscribe(
            (gr: Group) => {
                this.group = gr;
                this.api.store.subFind('group', this.group.pk, 'members').then(m => {
                    this.members = m;
                });
            }
        );
    }
}
