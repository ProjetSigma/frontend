import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../services/api.service';
import {Group} from '../../../resources/group';
import {GroupField} from '../../../resources/group-field';

@Component({
    selector: 'searchfield-group',
    templateUrl: 'searchfield-group.component.html',
})
export class SearchfieldGroupComponent {
    @Input('group') group: Group;
    public fields: GroupField[] = [];

    constructor(public api: APIService) {
    	//this.getFields();
    };
    /*
    getFields(){
    	this.fields = this.group.fields;
    };*/
}
