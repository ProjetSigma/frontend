import {Component, Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, ActivatedRoute, Resolve, Router}   from '@angular/router';

import {APIService} from 'services/api.service';
import {Event} from 'resources/event';

@Injectable()
export class EventResolver implements Resolve<Event> {
    constructor(private api: APIService) {}

    resolve(route: ActivatedRouteSnapshot) : Promise<Event> {
        return this.api.store.find('event', route.params['event_id']).catch((err) => {
            return Promise.resolve(undefined);
        });
    }
}

@Component({
    templateUrl: './event.component.html',
    selector: 'event',
})
export class EventComponent {
    public event: Event;

    constructor(public route: ActivatedRoute, private router: Router) {}

    ngOnInit() {
        this.route.data.subscribe(data => {
            if(data['event'] == undefined) '';
            else
                this.event = data['event'];
        });
    }

}
