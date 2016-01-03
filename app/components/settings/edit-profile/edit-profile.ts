import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {User} from '../../../services/users/user';
import {ProfileDisplayComponent} from '../../users/user-details/profile-display/profile-display';
import {UserService} from '../../../services/users/user-service';
import {EditPasswordComponent} from '../edit-password/edit-password';


@Component({
    selector: 'edit-profile',
    templateUrl: './components/settings/edit-profile/edit-profile.html',
    providers: [UserService],
    directives: [ProfileDisplayComponent,EditPasswordComponent,NgForm]
})
export class EditProfileComponent {
    public me:User;
    public meEdit:User;
    public editMode:boolean;
    public errorOnEdit:boolean = false;
    public editPassword:boolean = false;

    constructor(public user_service:UserService) {
        this.me = new User();
        this.user_service.getMe()
            .subscribe(res => {
                this.me = res.json();
                this.meEdit = res.json();
            });
        this.editMode = false;
    }

    editProfile(user:User) {
        this.user_service.editUser(user).subscribe(
            () => {
                this.me = this.meEdit;
                this.editMode = false;
            },
            res => {
                console.log(res);
                this.errorOnEdit = true;
            }
        );
    }
}
