import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgIf} from '@angular/common';

import {Group} from 'resources/group';

import {APIService} from 'services/api.service';

@Component({
    selector: 'searchfield-grouplisting',
    templateUrl: 'searchfield-grouplisting.component.html'
})
export class SearchfieldGrouplistingComponent {
    @Input('group') group: Group;
    @Output('selected') selectedEvent = new EventEmitter<Group>();

    constructor(public api:APIService) {
    }

    selected(){
        this.selectedEvent.emit(this.group);
    }
}
