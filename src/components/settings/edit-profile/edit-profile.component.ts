import {Component} from '@angular/core';

import {APIService} from '../../../services/api.service';
import {User} from '../../../resources/user';

import {ProfileDisplayComponent} from '../../users/user-details/profile-display/profile-display.component';
import {EditPasswordComponent} from '../edit-password/edit-password.component';

@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent {
    private me: User;
    private meEdit: User;
    private editMode: boolean;
    private errorOnEdit: boolean = false;
    private profilePicture: File;

    constructor(public api: APIService) {
        this.editMode = false;
        this.me = new User();
        this.meEdit = new User();
        this.reloadProfile();
    }

    editProfile(user: User, profilePicture: File) {
        this.api.store.update('user', user.id, user).then(
            () => {
                let photo_url = 'http://127.0.0.1:8000/user/' + user.id + '/addphoto/';
                if (profilePicture) {
                    this.api.store.getAdapter('http').POST(
                        photo_url,
                        { file: profilePicture } // TODO: make it works...
                        ).then(
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
        this.api.store.find('user',this.api.me.id).then(me => {
            this.me = me;
            this.meEdit = me;
            console.log(me);
        });
    }

    profilePictureChangeListener($event): void {
        this.profilePicture = $event.target.files[0];
    }

}
