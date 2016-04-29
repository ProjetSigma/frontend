import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../shared/services/users/user';
import {PhoneNumberFrenchPipe} from '../profile-display/phone-number-french';

@Component({
    selector: 'inline-display',
    templateUrl: './users/user-details/inline-display/inline-display.html',
    pipes: [PhoneNumberFrenchPipe],
    directives: [NgIf, ROUTER_DIRECTIVES]
})
export class InlineUserDisplayComponent {
    @Input('user') user: User;
}
