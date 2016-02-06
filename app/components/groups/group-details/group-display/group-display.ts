import {Component,Input} from 'angular2/core';
import {NgFor, NgIf} from 'angular2/common';

import {Group} from '../../../../services/groups/group';

@Component({
    selector: 'group-display',
    templateUrl: './components/groups/group-details/group-display/group-display.html',
    directives: [NgFor, NgIf]
})
export class GroupDisplayComponent {
    @Input('group') group: Group;
}
