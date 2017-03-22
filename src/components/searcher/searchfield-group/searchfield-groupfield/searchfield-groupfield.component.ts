import {Component, Input} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../../services/api.service';
import {Group} from '../../../../resources/group';
import {GroupField} from '../../../../resources/group-field';

@Component({
    selector: 'searchfield-groupfield',
    templateUrl: 'searchfield-groupfield.component.html',
})
export class SearchfieldGroupfieldComponent {
    @Input('groupfield') groupfield: GroupField;

    constructor(public api: APIService) {

    };
}
