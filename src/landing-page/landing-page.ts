import {Component} from 'angular2/core';

import {LoginFormComponent} from './login-form/login-form';

@Component({
    selector: 'landing-page',
    templateUrl: './landing-page/landing-page.html',
    directives : [LoginFormComponent]
})
export class LandingPageComponent { }
