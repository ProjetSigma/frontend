import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';
import {UserInlineDisplayComponent} from '../../../users/user-details/user-inline-display/user-inline-display.component';

@Component({
    selector: 'group-members',
    templateUrl: 'group-members.component.html',
})
export class GroupMembersComponent {
    public group: Group;

    constructor(public grPr: GroupProvider) {
        this.grPr.group.subscribe(
            (gr: Group) => {this.group = gr;}
        );
    }
}
