import {Component} from '@angular/core';
import {ActivatedRoute, Params}   from '@angular/router';

import {Record} from 'js-data';
import {APIService} from '../../services/api.service';

@Component({
    templateUrl: 'group.component.html'
})
export class GroupComponent {
    
    constructor(route: ActivatedRoute) {
        
    };
    
    enabledRoute(name) {
        return (name == "publications");
    }
}
