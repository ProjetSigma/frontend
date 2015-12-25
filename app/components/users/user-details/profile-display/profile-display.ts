import {Component,Input} from 'angular2/core';

import {User} from '../../../../services/users/user';


@Component({
    selector: 'profile-display',
    templateUrl: './components/users/user-details/profile-display/profile-display.html'
})
export class ProfileDisplayComponent {
    @Input('user') user: User;
}
