import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {User} from '../../shared/resources/user';
import {UserInlineDisplayComponent} from '../user-details/user-inline-display/user-inline-display';
import {MembershipService} from '../../shared/services/memberships/membership-service';
import {GroupService} from '../../shared/services/groups/group-service';

@Component({
    selector: 'users-list',
    templateUrl: './users/users-list/users-list.html',
    providers: [APIService, User],
    directives: [NgFor, ROUTER_DIRECTIVES, UserInlineDisplayComponent]
})
export class UsersListComponent {
    public users: User[] = [];

    constructor(public api: APIService) {
        this.getUsers();
    };

    getUsers() {
        this.api.store.findAll('user').then(res => this.users = res);
    }
}
