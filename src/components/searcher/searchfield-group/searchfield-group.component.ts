import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../../services/api.service';
import {Group} from '../../../resources/group';

@Component({
    selector: 'searchfield-group',
    templateUrl: 'searchfield-group.component.html'
})
export class SearchfieldGroupComponent {
	public group_name = "X-Ray"
    public group_fields = ["Poste","Couleur de cheveux"];
    public deletable = false;
}
