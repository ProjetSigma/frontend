import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES
} from 'angular2/router';

@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES]
})
export class AppCmp {}
