import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Group} from '../../../shared/services/groups/group';
import {GroupService} from '../../../shared/services/groups/group-service';

@Component({
    selector: 'group-inline-display',
    templateUrl: './groups/group-details/group-inline-display/group-inline-display.html',
    directives: [NgIf, ROUTER_DIRECTIVES],
    providers: [GroupService]
})
export class GroupInlineDisplayComponent {
    @Input('group') group: Group;

    constructor(public group_service:GroupService) {}

    ngOnChanges() {
        if (this.group.resp_group !== undefined) {
            this.getRespGroup(String(this.group.resp_group));
        }
    }

    getRespGroup(id: string) {
        if (id !== 'null') {//id can be null for school groups
            this.group_service.getGroup(id)
                .subscribe(res => {
                    var resp_group = res.json();
                    this.group_service.getGroup(String(resp_group.id))
                    .subscribe(res => this.group.resp_group = res.json()););
                });
        }
    }
}
