import {Component, Input} from 'angular2/core';
import {NgIf} from 'angular2/common';
import {ROUTER_DIRECTIVES} from 'angular2/router';

import {Group} from '../../../shared/resources/group';
import {APIService} from '../../../shared/services/api-service';

@Component({
    selector: 'group-inline-display',
    templateUrl: './groups/group-details/group-inline-display/group-inline-display.html',
    directives: [NgIf, ROUTER_DIRECTIVES],
    providers: [APIService]
})
export class GroupInlineDisplayComponent {
    @Input('group') group: Group;

    constructor(public api:APIService) {}
}
