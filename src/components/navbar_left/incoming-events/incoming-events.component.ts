import {Component, Input} from '@angular/core';
import {Event} from 'resources/event';
import {APIService} from 'services/api.service';

@Component({
    templateUrl: 'incoming-events.component.html',
    selector: 'incoming-events'
})

export class IncomingEventsComponent {
    @Input('event') events: Event[] = [];

    constructor(public api: APIService) {
        this.api.store.find('event').then(res => {
          res.forEach((e) => {
            this.events.push(e);
          });
        })
    }
}
