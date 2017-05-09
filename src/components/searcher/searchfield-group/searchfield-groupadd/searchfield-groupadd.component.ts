import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {Group} from '../../../../resources/group';
import {GroupField} from '../../../../resources/group-field';
import {SearcherComponent} from '../../searcher.component';

@Component({
    selector: 'searchfield-groupadd',
    templateUrl: 'searchfield-groupadd.component.html',
})
export class SearchfieldGroupaddComponent {
	public allGroups;
    public displayedGroups: Group[] = [];
    public searchGroup = '';
    private searchBar;
    @Input('searcher') searcher: SearcherComponent;

    constructor(public api: APIService) {
        this.allGroups = [];
        this.displayedGroups = [];
        this.getGroups();
        this.searchGroup = '';
    };

    getGroups() {
        this.api.store.find('group').then(res => {
            this.allGroups = res;
        });
    };

    inputChanged(searchBar) {
        this.searchBar = searchBar.target;
        this.updateGroups(this.searchBar.value);
        this.scrollDown();
    };

    updateGroups(value) {
        this.displayedGroups = [];
        if (value.trim() === '') {
            return;
        }
        value = value.toLowerCase();

        this.displayedGroups = this.allGroups.filter((group) => {
            for(var index = 0; index<this.searcher.groups.length; index++){
                if (this.searcher.groups[index]==group) {
                    return false;
                }
            }
            if (group.name.toLowerCase().indexOf(value) > -1) {
                return true;
            }
            return false;
        });
    };

    scrollDown(){
        document.getElementById('searcher-groupadd').scrollIntoView();
    };

    addGroup(group){
        this.searchBar.value='';
        this.searcher.addGroup(group);
        this.updateGroups('');
    };
};
