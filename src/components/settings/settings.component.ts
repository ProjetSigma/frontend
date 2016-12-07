import {Component} from '@angular/core';

import {User} from '../../resources/user';

import {EditProfileComponent} from './edit-profile/edit-profile.component';
import {APIService} from '../../services/api.service';

@Component({
    selector: 'settings',
    templateUrl: 'settings.component.html'
})
export class SettingsComponent {
	private me: User;
    private editProfile: boolean;
	private editPassword: boolean;


    constructor(public api: APIService) {
        this.editProfile = false;
		this.editPassword = false;
		this.me = this.api.me;
    }
	
	profileEdited(edit: boolean) {
		//Not very clean, but it's the only way to intercept edit-profile event with this modular structure
		this.editProfile = false;
	}
}
