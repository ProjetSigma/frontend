import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {UserService} from '../../../services/users/user-service';
import {User} from '../../../services/users/user';
import {ProfileDisplayComponent} from './profile-display/profile-display';

@Component({
    selector: 'users-list',
    templateUrl: './components/users/user-details/user-details.html',
    providers: [UserService],
    directives: [NgFor,ProfileDisplayComponent]
})
export class UserDetailsComponent {
    public user = new User();

    constructor(public user_service:UserService, params: RouteParams) {
        this.getUser(params.get('id'));
    };

    getUser(id: string) {
        this.user_service.getUser(id)
            .subscribe(res => this.user = res.json());
    }
}
