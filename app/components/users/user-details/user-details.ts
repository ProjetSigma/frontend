import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {UserService} from '../../../services/users/user-service';


@Component({
    selector: 'users-list',
    templateUrl: './components/users/user-details/user-details.html',
    providers: [UserService],
    directives: [NgFor]
})
export class UserDetailsComponent {
    public user = {};
    public user_id;

    constructor(public user_service:UserService, params: RouteParams) {
        this.user_id = params.get('id');
        this.getUser(params.get('id'));
    };

    getUser(id: string) {
        this.user_service.getUser(id)
            .subscribe(res => this.user = res.json());
    }
}
