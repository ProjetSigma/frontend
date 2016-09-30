import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {User} from '../../../../resources/user';

import {PhoneNumberFrenchPipe} from '../../phone-number-french';

@Component({
    selector: 'user-inline-display',
    templateUrl: 'user-inline-display.component.html'
})
export class UserInlineDisplayComponent {
    @Input('user') user: User;
};
