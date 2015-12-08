import {Component, ViewEncapsulation} from 'angular2/angular2';
import {
    ROUTER_DIRECTIVES
} from 'angular2/router';
import {MenuBarComponent} from '../menu-bar/menu-bar';
import {MainComponent} from '../main/main';

@Component({
    selector: 'app',
    templateUrl: './components/app/app.html',
    encapsulation: ViewEncapsulation.None,
    directives: [ROUTER_DIRECTIVES, MenuBarComponent,MainComponent]
})
export class AppComponent {}
