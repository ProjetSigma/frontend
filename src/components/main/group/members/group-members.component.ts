import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {UserInlineDisplayComponent} from '../../../users/user-details/user-inline-display/user-inline-display.component';
import {APIAdapterService} from 'services/adapter.service';
import {APIService} from 'services/api.service';

@Component({
    templateUrl: 'group-members.component.html',
})
export class GroupMembersComponent {
    public group: Group;
    public users;

    constructor(public grPr: GroupProvider, protected api: APIService, protected adapter: APIAdapterService) {
        this.grPr.group.subscribe(
            (gr: Group) => { this.group = gr;

            this.users = this.api.store.find('group', this.group.pk, {
              endpoint: 'group',
              pathname: 'members'
            });
            }
        );
        //this.users = adapter.GET('/group/'+this.group.pk+'/members');
    }
}
