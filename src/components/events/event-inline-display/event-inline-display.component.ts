import {Component, Input} from '@angular/core';
import {APIService} from 'services/api.service';


@Component({
    selector: 'event-inline-display',
    templateUrl: 'event-inline-display.component.html',
})
export class EventInlineDisplayComponent {

    constructor(public api: APIService) { };

}
