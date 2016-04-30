import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {User} from '../../shared/services/users/user';
import {ProfileDisplayComponent} from '../../users/user-details/profile-display/profile-display';
import {UserService} from '../../shared/services/users/user-service';
import {EditPasswordComponent} from '../edit-password/edit-password';
import {AuthService} from '../../shared/services/auth-service';
import * as _ from 'lodash';

@Component({
    selector: 'edit-profile',
    templateUrl: './settings/edit-profile/edit-profile.html',
    providers: [UserService],
    directives: [ProfileDisplayComponent,EditPasswordComponent,NgForm]
})
export class EditProfileComponent {
    private me:User;
    private meEdit:User;
    private editMode:boolean;
    private errorOnEdit:boolean = false;
    private profilePicture:File;

    constructor(public user_service:UserService, public auth_service:AuthService) {
        this.me = auth_service.user;
        this.meEdit = _.clone(auth_service.user);
        this.editMode = false;
    }

    editProfile(user:User, profilePicture:File) {
        this.user_service.editUser(user).subscribe(
            () => {
                if (profilePicture) {
                    this.user_service.changeUserPhoto(user, profilePicture).subscribe(
                        () => {
                            console.log('Upload successfull');
                            this.me = this.meEdit;
                            this.editMode = false;
                            this.reloadProfile();
                        },
                        res => {
                            this.errorOnEdit = true;
                        }
                    );
                } else {
                    this.me = this.meEdit;
                    this.editMode = false;
                    this.reloadProfile();
                }
            },
            res => {
                this.errorOnEdit = true;
            }
        );
    }

    reloadProfile() {
        this.auth_service.loadUser().subscribe(() => {
            this.me = this.auth_service.user;
            this.meEdit = this.auth_service.user;
        });
    }

    profilePictureChangeListener($event): void {
        this.profilePicture = $event.target.files[0];
    }

}
