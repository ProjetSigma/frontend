import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {Group} from '../../../../resources/group';
import {GroupField} from '../../../../resources/group-field';

@Component({
    selector: 'searchfield-groupadd',
    templateUrl: 'searchfield-groupadd.component.html',
})
export class SearchfieldGroupaddComponent {
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
        this.api.store.findAll('group').then(res => {
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

    getter($event){
        this.searchGroup = '';
        this.displayedGroups = this.allGroups;
    }
}
