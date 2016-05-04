import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {User} from '../../shared/resources/user';

import {InlineUserDisplayComponent} from '../user-details/inline-display/inline-display';

@Component({
    selector: 'users-list',
    templateUrl: './users/users-list/users-list.html',
    providers: [APIService, User],
    directives: [NgFor, ROUTER_DIRECTIVES, InlineUserDisplayComponent]
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
