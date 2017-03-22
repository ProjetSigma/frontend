import {Component, Input,OnInit} from '@angular/core';
import {NgFor} from '@angular/common';
import {ActivatedRoute, Params} from '@angular/router';

import {Record} from 'js-data';
import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';
import {GroupField} from '../../resources/group-field';

@Component({
    selector: 'searcher',
    templateUrl: 'searcher.component.html'
})
export class SearcherComponent implements OnInit{
    public groups: Group[] = [];
    @Input('group') group: Group;

    constructor(public api: APIService){
        this.groups = [this.group];
    }

    ngOnInit() {
        this.groups = [this.group];
    };

    getGroup(id) {
        this.api.store.find('group', id).then(res => {
            this.group = res;
            this.groups =  [res];
        });
    }

/*
	@Input('groups') ggroups: Group[] = [];
    public groups: Group[] = [];
	

    constructor(public api: APIService, route: ActivatedRoute) {
        this.groups = [];
        this.getGroup(1);
    };


    */
}
