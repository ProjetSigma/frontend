import {Component,Input} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {User} from '../../../shared/resources/user';

import {PhoneNumberFrenchPipe} from './phone-number-french';
import {GroupInlineDisplayComponent} from '../../../groups/group-details/group-inline-display/group-inline-display';

@Component({
    selector: 'profile-display',
    templateUrl: './users/user-details/profile-display/profile-display.html',
    pipes: [PhoneNumberFrenchPipe],
    directives: [NgFor, NgIf, ROUTER_DIRECTIVES, GroupInlineDisplayComponent]
})
export class ProfileDisplayComponent {
    @Input('user') user: User;
}
