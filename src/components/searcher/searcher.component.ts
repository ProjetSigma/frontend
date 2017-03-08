import {Component} from '@angular/core';
import {NgFor} from '@angular/common';

import {APIService} from '../../services/api.service';
import {Group} from '../../resources/group';

@Component({
    selector: 'searcher',
    templateUrl: 'searcher.component.html'
})
export class SearcherComponent {
    private groups: Group[] = [new Group()];

    constructor(public api: APIService) {
        this.groups = [new Group()];
    };
}
