import {Component, Input, OnInit} from '@angular/core';
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
export class SearcherComponent implements OnInit {
    @Input('group') group: Group;
    public groups: Group[] = [];

    constructor(public api: APIService){
    }

    ngOnInit() {
        this.addGroup(this.group);
    };

    addGroup(group){
        if(group!=undefined){
            this.groups.push(group);
        };
    }
}
