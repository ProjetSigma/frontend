import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {RouteParams} from 'angular2/router';

import {Record} from 'js-data';
import {APIService} from '../../shared/services/api-service';
import {ProfileDisplayComponent} from './profile-display/profile-display';

@Component({
    selector: 'users-details',
    templateUrl: './users/user-details/user-details.html',
    providers: [APIService],
    directives: [NgFor, ProfileDisplayComponent]
})
export class UserDetailsComponent {
    public user = new Record();

    constructor(public api: APIService, params: RouteParams) {
        this.getUser(params.get('id'));
    };

    getUser(id) {
        this.api.User.find(id).then(res => this.user = res);
    }
}
