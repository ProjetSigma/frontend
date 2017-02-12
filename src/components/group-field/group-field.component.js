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
	//Pourquoi créer un GroupDetailsComponent dans ce cas ? Ne peut on pas mettre à la fois un accès par Input et par route ?
    @Input('field') field: GroupField;
    @Input('membership') membership: Membership;
    
    private field_values: GroupFieldValues[] = []; 

    constructor(public api: APIService) {
        
    };
    
}
