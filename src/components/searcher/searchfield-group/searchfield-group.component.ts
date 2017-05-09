import {Component, Input, OnInit} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../services/api.service';
import {Group} from '../../../resources/group';
import {GroupField} from '../../../resources/group-field';
import {SearcherComponent} from '../searcher.component';

@Component({
    selector: 'searchfield-group',
    templateUrl: 'searchfield-group.component.html',
})
export class SearchfieldGroupComponent implements OnInit {
    @Input('searcher') searcher: SearcherComponent;
    @Input('group') group: Group;
    @Input('deletable') deletable: Boolean;
    public fields: GroupField[] = [];

    constructor(public api: APIService) {
    };

    ngOnInit(){
        this.getFields();
    };
    
    getFields(){
        this.api.store.find('group', this.group.pk).then(res => {
            this.fields=res.fields;
        });
    };

    remove(){
        this.searcher.removeGroup(this.group);
    }
}
