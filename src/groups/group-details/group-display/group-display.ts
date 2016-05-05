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
        if (this.group && this.group.resp_group !== undefined) {
             this.getRespGroup(String(this.group.resp_group));
        }
        if (this.group && this.group.memberships !== undefined) {
            this.getMembersId(this.group.memberships);
        }
    }

    getRespGroup(id: string) {
        if (id !== 'null') {//id can be null for school groups
            this.api.store.find('group', id).then(res => this.resp_group = res);
        }
    }

    getMembersId(memberships : number[]) {
        for (var id of memberships) {
            this.api.store.find('membership', id).then(res => this.getMember(res.user));
        }
    }

    getMember(member_id : number) {
        this.api.store.find('user', member_id).then(res => this.members.push(res));
    }
}
