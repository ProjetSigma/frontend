import {Component, EventEmitter, Output, Input} from '@angular/core';

import {APIService} from '../../../services/api.service';
import {User} from '../../../resources/user';

import {ProfileDisplayComponent} from '../../users/user-details/profile-display/profile-display.component';
import {EditPasswordComponent} from '../edit-password/edit-password.component';


@Component({
    selector: 'edit-profile',
    templateUrl: 'edit-profile.component.html'
})
export class EditProfileComponent {
    @Output() profileEdited = new EventEmitter<boolean>();
	@Input('user') me: User;

    private errorOnEdit: boolean = false;
    private profilePicture: File;
	
	constructor(public api: APIService) {
    }
	
    editProfile(user: User, profilePicture: File) {
		//Modify the JS-Data store (which itself send the right request to Django ?)
        // this.api.store.update('user', user.id, user).then(
            // () => {
				// Uploading of the photo apart
                // if (profilePicture) {
					// let photo_url = 'http://127.0.0.1:8000/user/' + user.id + '/addphoto/';
                    // this.api.store.getAdapter('http').POST(photo_url,{ file: profilePicture }).then(
                        // () => {
                            // console.log('Upload successfull');
                            // this.backToProfile();
                        // },
                        // res => {
                            // this.errorOnEdit = true;
                        // }
                    // );
                // }
				// else
				// {
					// console.log("Profile edited");
                    // this.backToProfile();
                // }
            // },
            // res => {
                // this.errorOnEdit = true;
            // }
            // );
    }
	
	backToProfile() {
		this.profileEdited.emit(true);
	}


    profilePictureChangeListener($event): void {
        this.profilePicture = $event.target.files[0];
    }
}
