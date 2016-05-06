import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitchDefault} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Record} from 'js-data';
import {APIService} from '../../../shared/services/api-service';
import {User} from '../../../shared/resources/user';
import {UserInlineDisplayComponent} from '../../../users/user-details/user-inline-display/user-inline-display';

@Component({
    selector: 'group-display',
    templateUrl: './groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitchDefault, ROUTER_DIRECTIVES, UserInlineDisplayComponent]
})
export class GroupDisplayComponent {
    @Input('group') group;
    private resp_group = new Record();
    private members: User[] = [];

    constructor(public api: APIService) { };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the group to display.
    ngOnChanges() {
        if (this.group !== undefined) {
             this.getRespGroup();
             this.getMembers();
        }
    }

    getRespGroup() {
            this.api.store.find('group', this.group.resp_group_id);
    }

    getMembers() {
        this.api.store.findAll('membership',{'group':this.group.id}).then(res =>{
            for (var membership of this.group.memberships) {
                this.api.store.find('user', membership.user_id);
            };
        })

    }
}
