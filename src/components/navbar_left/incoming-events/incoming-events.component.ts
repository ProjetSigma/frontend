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
          var i = 0;
          var nbEvents = 5; // Number of events to display
          res.forEach((e) => {
            if (i < nbEvents){
              this.events.push(e);
            }
            i++;
          });
        })
    }
}
