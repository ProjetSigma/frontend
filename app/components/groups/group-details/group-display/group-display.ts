import {Component, Input} from 'angular2/core';
import {NgFor, NgIf, NgSwitch, NgSwitchWhen, NgSwitchDefault} from 'angular2/common';

import {Group} from '../../../../services/groups/group';
import {GroupService} from '../../../../services/groups/group-service';
import {Membership} from '../../../../services/memberships/membership';
import {MembershipService} from '../../../../services/memberships/membership-service';
import {User} from '../../../../services/users/user';
import {UserService} from '../../../../services/users/user-service';

@Component({
    selector: 'group-display',
    templateUrl: './components/groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf, NgSwitch, NgSwitchWhen, NgSwitchDefault],
    providers: [GroupService,MembershipService,UserService]
})
export class GroupDisplayComponent {
    @Input('group') group: Group;
    private resp_group: Group = new Group();
    private members_id : number[] = [];
    private members : User[] = [];

    constructor(
        public group_service: GroupService,
        public membership_service : MembershipService,
        public user_service : UserService
    ) { };

    //The component is loaded before the answer to the request,
    //that is why we have to update the view with new data
    //once the answer is received alog with the group to display.
    ngOnChanges() {
        if (this.group.resp_group !== undefined) {
            this.getRespGroup(String(this.group.resp_group));
        }
        if (this.group.memberships !== undefined) {
            this.getMembersId(this.group.memberships);
        }
        this.getMembers(this.members_id);
    };

    getRespGroup(id: string) {
        if (id !== "null") {//id can be null for school groups
            this.group_service.getGroup(id)
                .subscribe(res => this.resp_group = res.json());
        }
    }

    getMembersId(memberships : number[]) {
        for (var id of memberships) {
            this.membership_service.getMembership(String(id))
                .suscribe(res => this.members_id.push(res.json()));
        }
    }

    getMembers(members_id : number[]) {
        for (var id of members_id) {
            this.user_service.getUser(String(id))
            .suscribe(res => this.members.push(res.json()));
        }
    }


}
