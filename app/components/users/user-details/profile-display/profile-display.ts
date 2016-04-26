import {Component,Input} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../../services/users/user';
import {PhoneNumberFrenchPipe} from './phone-number-french';

@Component({
    selector: 'profile-display',
    templateUrl: './components/users/user-details/profile-display/profile-display.html',
    pipes: [PhoneNumberFrenchPipe],
    directives: [NgFor, NgIf, ROUTER_DIRECTIVES]
})
export class ProfileDisplayComponent {
    @Input('user') user: User;
}
