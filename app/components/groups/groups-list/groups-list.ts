import {Component} from 'angular2/core';
import {NgFor} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

//import {UserService} from '../../../services/users/user-service';
//import {User} from '../../../services/users/user';


@Component({
    selector: 'groups-list',
    templateUrl: './components/groups/groups-list/groups-list.html',
    providers: [],
    directives: [NgFor, ROUTER_DIRECTIVES]
})
export class GroupsListComponent {
    public groups;

}
