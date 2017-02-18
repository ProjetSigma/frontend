import {Component, Input} from '@angular/core';
import {APIService} from '../../services/api.service';

import {Membership} from '../../resources/membership';
import {GroupField} from '../../resources/group-field';
import {GroupFieldValue} from '../../resources/group-field-value';

@Component({
    selector: 'group-field',
    templateUrl: 'group-field.component.html',
})
export class GroupDisplayComponent {
    @Input('field') field: GroupField;
    @Input('membership') membership: Membership;
    
    private field_values: GroupFieldValues[] = []; 

    constructor(public api: APIService) {
        
    };
    
}
