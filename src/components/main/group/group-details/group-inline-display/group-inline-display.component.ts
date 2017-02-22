import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {Group} from '../../../../../resources/group';

import {APIService} from '../../../../../services/api.service';

@Component({
    selector: 'group-inline-display',
    templateUrl: 'group-inline-display.component.html',
    styleUrls: ['./group-inline-display.component.scss']
})
export class GroupInlineDisplayComponent {
    @Input('group') group: Group;

    constructor(public api:APIService) {
        }
}
