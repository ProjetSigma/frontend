import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {UserService} from '../../services/users/user-service';

@Component({
    selector: 'users-list',
    templateUrl: './components/users-list/users-list.html',
    providers: [UserService],
    directives: [NgFor]
})
export class UsersListComponent {
    public users;

    constructor(public user_service:UserService) {
    };

    getUsers() {
        this.user_service.getUsers()
        .subscribe(res => this.users = res.json());
    }


}
