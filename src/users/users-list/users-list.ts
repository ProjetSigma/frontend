import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {Record} from 'js-data';

import {APIService} from '../../shared/services/api-service';
import {InlineUserDisplayComponent} from '../user-details/inline-display/inline-display';

@Component({
    selector: 'users-list',
    templateUrl: './users/users-list/users-list.html',
    providers: [APIService, Record],
    directives: [NgFor, ROUTER_DIRECTIVES, InlineUserDisplayComponent]
})
export class UsersListComponent {
    public users: Record[] = [];

    constructor(public api: APIService) {
        this.getUsers();
    };

    getUsers() {
        this.api.User.findAll({}).then(res => this.users = res);
    }
}
