import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';

import {Group} from '../../../resources/group';

@Component({
    selector: 'group-members',
    templateUrl: 'group-members.component.html',
})
export class GroupMembersComponent {
    @Input('group') group: Group;
    
    constructor() { }
}
