import {Component, Input} from '@angular/core';
import {APIService} from 'services/api.service';


@Component({
    selector: 'event-creator',
    templateUrl: 'event-creator.component.html',
})
export class EventCreatorComponent {

    constructor(public api: APIService) { };

}
