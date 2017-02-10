import {Component, Input} from '@angular/core';

import {Group} from '../../../resources/group';

@Component({
    selector: 'group-publications',
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent {
    @Input('group') group: Group;
}
