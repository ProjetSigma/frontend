import {Component} from 'angular2/angular2';
import {UsersListComponent} from '../users-list/users-list';

@Component({
    selector: 'main',
    templateUrl: './components/main/main.html',
    directives : [UsersListComponent]
})
export class MainComponent { }
