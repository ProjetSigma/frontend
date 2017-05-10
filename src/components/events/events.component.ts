import {Component, Input} from '@angular/core';
import {APIService} from 'services/api.service';


@Component({
    selector: 'events',
    templateUrl: 'events.component.html',
})
export class EventsComponent {

    constructor(public api: APIService) { };

}
