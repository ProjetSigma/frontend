import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {GroupService} from '../../shared/services/groups/group-service';
import {Group} from '../../shared/services/groups/group';
import {GroupInlineDisplayComponent} from '../group-details/group-inline-display/group-inline-display';


@Component({
    selector: 'groups-list',
    templateUrl: './groups/groups-list/groups-list.html',
    providers: [GroupService],
    directives: [NgFor,ROUTER_DIRECTIVES,GroupInlineDisplayComponent]
})
export class GroupsListComponent {
    public groups:Group[];

    constructor(public user_service:GroupService) {
        this.getGroups();
    };

    getGroups() {
        this.user_service.getGroups()
            .subscribe(res => this.groups = res.json());
    }
}
