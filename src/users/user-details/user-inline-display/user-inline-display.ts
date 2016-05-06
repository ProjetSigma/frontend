import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../shared/resources/user';

import {PhoneNumberFrenchPipe} from '../profile-display/phone-number-french';

@Component({
    selector: 'user-inline-display',
    templateUrl: './users/user-details/user-inline-display/user-inline-display.html',
    pipes: [PhoneNumberFrenchPipe],
    directives: [NgIf, ROUTER_DIRECTIVES]
})
export class UserInlineDisplayComponent {
    @Input('user') user: User;
}
