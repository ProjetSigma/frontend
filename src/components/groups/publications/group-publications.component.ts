import {Component, Input} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';

import {Group} from '../../../resources/group';

@Component({
    selector: 'group-publications',
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent {
    // @Input('group') group: Group;
    @Input('group') group: number;
    
    constructor(public route: ActivatedRoute) {
        
    }
}
