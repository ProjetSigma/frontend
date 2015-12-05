import {Component, NgFor} from 'angular2/angular2';
import {UserService} from '../../services/users/user-service';

@Component({
    selector: 'users-list',
    templateUrl: './components/users-list/users-list.html',
    providers: [UserService],
    directives: [NgFor]
})
export class UsersListComponent {
    public users;

    constructor(public user_service:UserService) {};

    getUsers() {
        this.users = this.user_service.getUsers();
        console.log(this.users);
    }


}
