import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';

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
