import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../services/api.service';
import {User} from '../../../resources/user';
import {UserInlineDisplayComponent} from '../user-details/user-inline-display/user-inline-display.component';

@Component({
    selector: 'users-list',
    templateUrl: 'users-list.component.html'
})
export class UsersListComponent {
    private allUsers: User[] = [];
    private displayedUsers: User[] = [];
    private searchUser: string = '';

    constructor(public api: APIService) {
        this.allUsers = [];
        this.displayedUsers = [];
        this.getUsers();
        this.searchUser = '';
    };

    getUsers() {
        this.api.store.findAll('user').then(res => {
            this.allUsers = res;
            this.displayedUsers = res;
        });
    }

    updateUsers(searchBar) {
        this.displayedUsers = this.allUsers;

        var q = searchBar.target.value;
        if (q.trim() === '') {
            return;
        }
        q = q.toLowerCase();

        this.displayedUsers = this.allUsers.filter((user) => {
            if (user.firstname.concat(' '.concat(user.lastname)).toLowerCase().indexOf(q) > -1
                || user.lastname.concat(' '.concat(user.firstname)).toLowerCase().indexOf(q) > -1
            ) {
                return true;
            }
            return false;
        });
    }
}
