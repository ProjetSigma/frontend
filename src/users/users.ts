import {Component, ViewEncapsulation} from 'angular2/core';
import {ROUTER_DIRECTIVES, RouteConfig} from 'angular2/router';

import {UsersListComponent} from './users-list/users-list';
import {UserDetailsComponent} from './user-details/user-details';

@Component({
    selector: 'users',
    templateUrl: './users/users.html',
    encapsulation: ViewEncapsulation.Emulated,
    directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
	{path: '/', component: UsersListComponent, useAsDefault: true, as: 'List'},
	{path: '/:id', component: UserDetailsComponent, as: 'Details'},
])
export class UsersComponent {}
