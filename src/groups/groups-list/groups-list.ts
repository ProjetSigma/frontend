import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';


@Component({
    selector: 'groups-list',
    templateUrl: './groups/groups-list/groups-list.html',
    providers: [APIService],
    directives: [NgFor, ROUTER_DIRECTIVES]
})
export class GroupsListComponent {
    public groups;

    constructor(public api: APIService) {
        this.getGroups();
    };

    getGroups() {
        this.api.store.findAll('group').then(res => this.groups = res);
    }
}
