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
    public show = false;
    public group_fields = ["Promo","Casert", "Section"];
    public field_values = [
    {
      id: 0,
      value: "X2015"
    },
    {
      id: 1,
      value: "10.40.57"
    },
    {
      id: 2,
      value: "Ultimate"
    }
    ];
};
