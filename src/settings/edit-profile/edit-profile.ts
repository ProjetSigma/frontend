import {Component} from 'angular2/core';
import {NgForm} from 'angular2/common';

import {Record} from 'js-data';

import {APIService} from '../../shared/services/api-service';
import {ProfileDisplayComponent} from '../../users/user-details/profile-display/profile-display';
import {EditPasswordComponent} from '../edit-password/edit-password';
import {AuthService} from '../../shared/services/auth-service';
import * as _ from 'lodash';

@Component({
    selector: 'edit-profile',
    templateUrl: './settings/edit-profile/edit-profile.html',
    providers: [APIService],
    directives: [ProfileDisplayComponent, EditPasswordComponent, NgForm]
})
export class EditProfileComponent {
    private me;
    private meEdit;
    private editMode:boolean;
    private errorOnEdit:boolean = false;
    private profilePicture:File;

    constructor(public api: APIService, public auth_service: AuthService) {
        this.me = auth_service.user;
        this.meEdit = _.clone(auth_service.user);
        this.editMode = false;
    }

    editProfile(user: {id: number, any}, profilePicture:File) {
        this.api.User.update(user.id, user).then(
            () => {
                let photo_url = 'http://127.0.0.1:8000/user/' + user.id + '/addphoto/';
                if (profilePicture) {
                    this.api.DS.getAdapter('http').POST(
                        photo_url,
                        {file: profilePicture} // TODO: make it works...
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
        this.auth_service.loadUser().subscribe(() => {
            this.me = this.auth_service.user;
            this.meEdit = this.auth_service.user;
        });
    }

    profilePictureChangeListener($event): void {
        this.profilePicture = $event.target.files[0];
    }

}
