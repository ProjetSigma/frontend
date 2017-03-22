import {Component} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import {APIService} from '../../../services/api.service';
import {User} from '../../../resources/user';

import {ProfileDisplayComponent} from './profile-display/profile-display.component';

@Component({
    selector: 'users-details',
    templateUrl: 'user-details.component.html'
})
export class UserDetailsComponent {
    // public user = new User();

    constructor(public api: APIService, route: ActivatedRoute) {
        // route.params.forEach((params: Params) => {this.getUser(+params['id'])});
    };

    getUser(id) {
        // this.api.store.find('user', id).then(res => this.user = res);
    }
}
