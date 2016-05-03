import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {User} from '../../shared/services/user';

import {ProfileDisplayComponent} from './profile-display/profile-display';

@Component({
    selector: 'users-details',
    templateUrl: './users/user-details/user-details.html',
    providers: [APIService, User],
    directives: [NgFor, ProfileDisplayComponent]
})
export class UserDetailsComponent {
    public user = new User();

    constructor(public api: APIService, params: RouteParams) {
        this.getUser(params.get('id'));
    };

    getUser(id) {
        this.api.User.find(id).then(res => this.user = res);
    }
}
