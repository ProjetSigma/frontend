import {Component} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import {Record} from 'js-data';
import {APIService} from '../../../services/api.service';
import {GroupDisplayComponent} from './group-display/group-display.component';

@Component({
    selector: 'group-details',
    templateUrl: 'group-details.component.html'
})
export class GroupDetailsComponent {
    public group = new Record();

    constructor(public api: APIService, route: ActivatedRoute) {
        this.getGroup(+route.snapshot.params['id']);
    };

    getGroup(id) {
        this.api.store.find('group', id).then(res => this.group = res);
    }
}
