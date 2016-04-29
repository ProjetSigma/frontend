import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {EditProfileComponent} from './edit-profile/edit-profile';

@Component({
    selector: 'settings',
    templateUrl: './settings/settings.html',
    directives : [ROUTER_DIRECTIVES,EditProfileComponent]
})
export class SettingsComponent { }
