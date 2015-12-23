import {Component} from 'angular2/core';

import {User} from '../../../services/users/user';
import {UserService} from '../../../services/users/user-service';


@Component({
    selector: 'edit-profile',
    templateUrl: './components/settings/edit-profile/edit-profile.html',
    providers: [UserService],
})
export class EditProfileComponent {
    public me:User
    public editMode

    constructor(public user_service:UserService) {
        this.me = new User();
        this.user_service.getMe()
            .subscribe(res => this.me = res.json());
        this.editMode = false;
    }
}
