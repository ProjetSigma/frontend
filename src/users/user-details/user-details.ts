import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {APIService} from '../../shared/services/api-service';
import {User} from '../../shared/resources/user';

import {ProfileDisplayComponent} from './profile-display/profile-display';

@Component({
    selector: 'users-details',
    templateUrl: './users/user-details/user-details.html',
    directives: [NgFor, ProfileDisplayComponent]
})
export class UserDetailsComponent {
    public user = new User();

    constructor(public api: APIService, params: RouteParams) {
        this.getUser(params.get('id'));
    };

    getUser(id) {
        this.api.store.find('user', id).then(res => this.user = res);
    }
}
