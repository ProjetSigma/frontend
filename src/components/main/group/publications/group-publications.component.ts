import {Component} from '@angular/core';
import {GroupProvider} from '../group.component';
import {Group} from 'resources/group';

@Component({
    selector: 'group-publications',
    templateUrl: 'group-publications.component.html',
})
export class GroupPublicationsComponent {
    public group: Group;
    
    constructor(public grPr: GroupProvider) {
        this.grPr.group.subscribe(
            (gr: Group) => {this.group = gr;}
        );
    }
}
