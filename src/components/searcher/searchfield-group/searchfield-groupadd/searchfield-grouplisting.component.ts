import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {Group} from 'resources/group';
import {SearchfieldGroupaddComponent} from './searchfield-groupadd.component';

import {APIService} from 'services/api.service';

@Component({
    selector: 'searchfield-grouplisting',
    templateUrl: 'searchfield-grouplisting.component.html'
})
export class SearchfieldGrouplistingComponent {
    @Input('group') group: Group;
    @Input('adder') adder: SearchfieldGroupaddComponent;

    constructor(public api:APIService) {
    }

    selected(){
        this.adder.addGroup(this.group);
    }
}
