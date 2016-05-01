import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitchDefault} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../../shared/services/api-service';
import {InlineUserDisplayComponent} from '../../../users/user-details/inline-display/inline-display';

@Component({
    selector: 'group-display',
    templateUrl: './groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitchDefault, ROUTER_DIRECTIVES, InlineUserDisplayComponent],
    providers: [APIService]
})
export class GroupDisplayComponent {
    @Input('group') group;
    private resp_group;
    private members = [];

    constructor(public api: APIService) { };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the group to display.
    ngOnChanges() {
        console.log(this.group);
        // if (this.group && this.group.resp_group !== undefined) {
        //     this.getRespGroup(String(this.group.resp_group));
        // }
        // if (this.group && this.group.memberships !== undefined) {
        //     this.getMembersId(this.group.memberships);
        // }
    }

    getRespGroup(id: string) {
        if (id !== 'null') {//id can be null for school groups
            this.api.Group.find(id).then(res => this.resp_group = res);
        }
    }

    getMembersId(memberships : number[]) {
        for (var id of memberships) {
            this.api.Membership.find(id).then(res => this.getMember(res.user));
        }
    }

    getMember(member_id : number) {
        this.api.User.find(member_id).then(res => this.members.push(res));
    }
}
