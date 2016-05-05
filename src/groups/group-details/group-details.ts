import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {Record} from 'js-data';
import {APIService} from '../../shared/services/api-service';
import {GroupDisplayComponent} from './group-display/group-display';

@Component({
    selector: 'group-details',
    templateUrl: './groups/group-details/group-details.html',
    directives: [GroupDisplayComponent]
})
export class GroupDetailsComponent {
    public group = new Record();

    constructor(public api: APIService, params: RouteParams) {
        this.getGroup(params.get('id'));
    };

    getGroup(id) {
        this.api.store.find('group', id).then(res => this.group = res);
    }
}
