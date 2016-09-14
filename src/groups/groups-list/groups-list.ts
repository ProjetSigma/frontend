import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {GroupInlineDisplayComponent} from '../group-details/group-inline-display/group-inline-display';
import {Group} from '../../shared/resources/group';

@Component({
    selector: 'groups-list',
    templateUrl: './groups/groups-list/groups-list.html',
    directives: [NgFor, ROUTER_DIRECTIVES, GroupInlineDisplayComponent]
})
export class GroupsListComponent {
    private allGroups: Group[] = [];
    private displayedGroups: Group[] = [];
    private searchGroup: string = '';

    constructor(public api: APIService) {
        this.allGroups = [];
        this.displayedGroups = [];
        this.getGroups();
        this.searchGroup = '';
    };

    getGroups() {
        this.api.store.findAll('group').then(res => {
            this.allGroups = res;
            this.displayedGroups = res;
        });
    }

    updateGroups(searchBar) {
        this.displayedGroups = this.allGroups;

        var q = searchBar.target.value;
        if (q.trim() === '') {
            return;
        }
        q = q.toLowerCase();

        this.displayedGroups = this.allGroups.filter((group) => {
            if (group.name.toLowerCase().indexOf(q) > -1) {
                return true;
            }
            return false;
        });
    }
}
