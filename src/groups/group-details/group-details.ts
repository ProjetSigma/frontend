import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {GroupDisplayComponent} from './group-display/group-display';

@Component({
    selector: 'group-details',
    templateUrl: './groups/group-details/group-details.html',
    providers: [APIService],
    directives: [GroupDisplayComponent]
})
export class GroupDetailsComponent {
    public group;

    constructor(public api: APIService, params: RouteParams) {
        this.getGroup(params.get('id'));
    };

    getGroup(id) {
        this.api.Group.find(id).then(res => this.group = res);
    }
}
