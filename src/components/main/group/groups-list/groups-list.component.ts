import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {GroupInlineDisplayComponent} from '../group-details/group-inline-display/group-inline-display.component';
import {Group} from '../../../../resources/group';

@Component({
    templateUrl: 'groups-list.component.html'
})
export class GroupsListComponent {
    public allGroups: Group[] = [];
    public displayedGroups: Group[] = [];
    public searchGroup = '';

    constructor(public api: APIService) {
        this.allGroups = [];
        this.displayedGroups = [];
        this.getGroups();
        this.searchGroup = '';
    };

    getGroups() {
        this.api.store.find('group').then(res => {
            this.allGroups = res;
            this.displayedGroups = res;
        });
    }

    updateGroups(searchBar) {
        this.displayedGroups = this.allGroups;

        let q = searchBar.target.value;
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
