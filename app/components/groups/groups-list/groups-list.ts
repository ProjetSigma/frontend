import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {GroupService} from '../../../services/groups/group-service';
import {Group} from '../../../services/groups/group';


@Component({
    selector: 'groups-list',
    templateUrl: './components/groups/groups-list/groups-list.html',
    providers: [GroupService],
    directives: [NgFor, ROUTER_DIRECTIVES]
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
