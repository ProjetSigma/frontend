import {EventComponent, EventResolver} from './event.component';
import {Route}   from '@angular/router';

export const EventRoute : Route = {
    path: 'event/:event_id',
    component: EventComponent,
    resolve: { 'event' : EventResolver }
}
