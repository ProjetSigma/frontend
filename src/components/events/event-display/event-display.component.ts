import {Component, Input} from '@angular/core';
import {APIService} from 'services/api.service';


@Component({
    selector: 'event-display',
    templateUrl: 'event-display.component.html',
})
export class EventDisplayComponent {

    constructor(public api: APIService) { };

}
