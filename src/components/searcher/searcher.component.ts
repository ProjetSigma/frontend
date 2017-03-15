import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';
import {GroupField} from '../../resources/group-field';

@Component({
    selector: 'searcher',
    templateUrl: 'searcher.component.html'
})
export class SearcherComponent {
	private ids: number[];
	private groups: { [id: number]: Group;}={};
    private groupfields: { [id: number]: GroupField[];}={};

    constructor(public api: APIService) {
    	this.groups[0] = new Group();
        this.groupfields[0] = [new GroupField(), new GroupField()];
    	this.ids = [0];
    };
}
