import {Component, Input} from '@angular/core';
import {APIService} from 'services/api.service';
import { Event } from 'resources/event';

@Component({
    selector: 'event-display',
    templateUrl: 'event-display.component.html',
})
export class EventDisplayComponent {
  @Input('event') public event: Event;
    constructor(public api: APIService) { };

}
