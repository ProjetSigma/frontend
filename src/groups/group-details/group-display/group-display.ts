import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitchDefault} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../../shared/services/api-service';
import {Group} from '../../../shared/resources/group';
import {UserInlineDisplayComponent} from '../../../users/user-details/user-inline-display/user-inline-display';

@Component({
    selector: 'group-display',
    templateUrl: './groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitchDefault, ROUTER_DIRECTIVES, UserInlineDisplayComponent]
})
export class GroupDisplayComponent {
    @Input('group') group: Group;

    constructor(public api: APIService) { };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the group to display.
    ngOnChanges() {
        if (this.group !== undefined) {
            this.getMembers();
        }
    }

    getMembers() {
        this.api.store.findAll('membership', { 'group': this.group.id }).then(res => {
            for (var membership of this.group.memberships) {
                this.api.store.find('user', membership.user_id);
            };
        });
    }
}
