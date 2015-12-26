import {Component,Input} from 'angular2/core';

import {User} from '../../../../services/users/user';
import {PhoneNumberFrenchPipe} from './phone-number-french';

@Component({
    selector: 'profile-display',
    templateUrl: './components/users/user-details/profile-display/profile-display.html',
    pipes: [PhoneNumberFrenchPipe]
})
export class ProfileDisplayComponent {
    @Input('user') user: User;
}
