import {Component, Input} from '@angular/core';
import {NgIf} from '@angular/common';

import {Group} from '../../../../resources/group';

@Component({
    selector: 'group-inline-display',
    templateUrl: 'group-inline-display.component.html'
})
export class GroupInlineDisplayComponent {
    @Input('group') group: Group;

}
