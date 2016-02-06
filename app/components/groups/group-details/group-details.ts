import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';

import {GroupService} from '../../../services/groups/group-service';
import {Group} from '../../../services/groups/group';
import {GroupDisplayComponent} from './group-display/group-display';

@Component({
    selector: 'group-details',
    templateUrl: './components/groups/group-details/group-details.html',
    providers: [GroupService],
    directives: [GroupDisplayComponent]
})
export class GroupDetailsComponent {
    public group:Group = new Group();

    constructor(public group_service:GroupService, params: RouteParams) {
        this.getGroup(params.get('id'));
    };

    getGroup(id: string) {
        this.group_service.getGroup(id)
            .subscribe(res => this.group = res.json());
    }
}
