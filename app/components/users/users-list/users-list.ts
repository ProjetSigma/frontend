import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {UserService} from '../../../services/users/user-service';
import {User} from '../../../services/users/user';


@Component({
    selector: 'users-list',
    templateUrl: './components/users/users-list/users-list.html',
    providers: [UserService],
    directives: [NgFor, ROUTER_DIRECTIVES]
})
export class UsersListComponent {
    public users:User[];

    constructor(public user_service:UserService) {
        this.getUsers();
    };

    getUsers() {
        this.user_service.getUsers()
            .subscribe(res => this.users = res.json());
    }
}
