import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UserService} from '../../shared/services/users/user-service';
import {User} from '../../shared/services/users/user';
import {InlineUserDisplayComponent} from '../user-details/inline-display/inline-display';
import {MembershipService} from '../../shared/services/memberships/membership-service';
import {GroupService} from '../../shared/services/groups/group-service';


@Component({
    selector: 'users-list',
    templateUrl: './users/users-list/users-list.html',
    providers: [UserService, GroupService, MembershipService],
    directives: [NgFor,ROUTER_DIRECTIVES, InlineUserDisplayComponent]
})
export class UsersListComponent {
    public users: User[] = [];

    constructor(
        public user_service: UserService,
        public group_service: GroupService,
        public membership_service: MembershipService
        ) {
        this.getUsers();
    };

    getUsers() {
        this.user_service.getMe()
            .subscribe(res => this.getAllGroupMembers(res.json()));
    }

    getAllGroupMembers(user: User) {
        for (var group of user.groups) {
            this.group_service.getGroup(String(group))
                .subscribe(res => {
                var group = res.json();
                for (var membership of group.memberships) {
                    this.membership_service.getMembership(String(membership))
                        .subscribe(res => {
                        var membership = res.json();
                        this.user_service.getUser(membership.user)
                            .subscribe(res => {
                            var user = res.json();
                            var equalToUser = function(val) {
                                return (val.id === user.id);
                            };
                            if (!this.users.some(equalToUser)) {
                                this.users.push(res.json());
                            };
                        });
                    });
                };
            });
        };
    }
}
