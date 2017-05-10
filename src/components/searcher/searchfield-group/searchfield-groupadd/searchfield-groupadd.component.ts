import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {Group} from '../../../../resources/group';
import {GroupField} from '../../../../resources/group-field';
import {SearcherComponent} from '../../searcher.component';

import {GroupsListComponent} from '../../../main/group/groups-list/groups-list.component';

@Component({
    selector: 'searchfield-groupadd',
    templateUrl: 'searchfield-groupadd.component.html',
})
export class SearchfieldGroupaddComponent extends GroupsListComponent{
    @Input('searcher') searcher: SearcherComponent;

    constructor(public api: APIService) {
        super(api);
    };

    inputChanged(searchBar) {
        this.searchBar = searchBar.target;
        this.update();
        this.scrollDown();
    };

    scrollDown(){
        //document.getElementById('searcher-groupadd').scrollIntoView();
    };

    addGroup(group){
        this.searchBar.value='';
        this.searcher.addGroup(group);
        this.showDefault();
    };

    update(){
        this.blackList = this.searcher.groups;
        this.updateGroups(this.searchBar.value.split(' '));
    }

    showDefault() {
        this.displayedGroups = [];
    }
};
